'use server';

import { revalidatePath } from 'next/cache';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProductDescription(imageUrl: string) {
	try {
		console.log('image', imageUrl);
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: 'Write a concise, engaging product description suitable for a website. Avoid mentioning the product name, and make sure the description highlights what makes it stand out.' },
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
