'use server';

import { revalidatePath } from 'next/cache';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateProductDescription(imageUrl: string, productName: string) {
	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: 'Write a 30-word product description based on the and the item in the photo. The first sentence should contain the basic product qualities like material and color.' },
						{
							type: 'image_url',
							image_url: { url: imageUrl },
						},
					],
				},
			],
		});

		const text = response.choices[0].message.content;

		revalidatePath('/');
		return { description: text };
	} catch (error) {
		console.error('Error generating product description:', error);
		return { error: 'Failed to generate product description' };
	}
}
