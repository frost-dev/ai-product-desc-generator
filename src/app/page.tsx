'use client';

import { useCallback, useState } from 'react';
import { ImageUpload } from './components/image-upload';
import { DescriptionDisplay } from './components/description-display';
import { generateProductDescription } from './actions';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [description, setDescription] = useState<string | null | undefined>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	const handleImageUpload = (uploadedFile: File) => {
		setFile(uploadedFile);
		setDescription(null);
		setError(null);
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		setPreview(URL.createObjectURL(file));
		handleImageUpload(file);
	}, []);

	const handleRemoveImage = () => {
		setPreview(null);
		setDescription(null);
		setFile(null);
	};

	const handleGenerateDescription = async () => {
		if (!file) return;

		setIsLoading(true);
		setError(null);

		try {
			const formData = new FormData();
			const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

			if (uploadPreset) {
				formData.append('file', file);
				formData.append('upload_preset', uploadPreset);
			} else {
				console.error('Upload preset is not defined!');
			}

			const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload?folder=cebuana_uploads`, {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();

			if (!response.ok || !result.secure_url) {
				throw new Error('Image upload failed');
			}

			const imageUrl = result.secure_url;

			const { description, error } = await generateProductDescription(imageUrl);

			if (error) {
				setError(error);
			} else {
				setDescription(description);
			}

			setIsLoading(false);
		} catch (err) {
			console.error(err);
			setError('An error occurred while generating the description');
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
			<main className='container mx-auto p-4 py-8'>
				<h1 className='text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white'>Product Description Generator</h1>
				<div className='grid gap-8 md:grid-cols-2'>
					<div className='space-y-6'>
						<ImageUpload
							onDrop={onDrop}
							setPreview={setPreview}
							preview={preview}
							onRemoveImage={handleRemoveImage}
						/>
						<Button
							onClick={handleGenerateDescription}
							className='w-full text-lg py-6'
							disabled={!file || isLoading}
						>
							<Wand2 className='w-6 h-6 mr-2' />
							{isLoading ? 'Generating...' : 'Generate Description'}
						</Button>
					</div>
					<DescriptionDisplay
						description={description}
						isLoading={isLoading}
						error={error}
					/>
				</div>
			</main>
		</div>
	);
}
