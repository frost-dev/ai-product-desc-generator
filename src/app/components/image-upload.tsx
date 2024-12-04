'use client';

import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
	onDrop: (acceptedFiles: File[]) => void;
	setPreview: React.Dispatch<React.SetStateAction<string | null>>;
	preview: string | null;
	onRemoveImage: () => void;
}

export function ImageUpload({ onDrop, setPreview, preview, onRemoveImage }: ImageUploadProps) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
		},
		multiple: false,
	});

	return (
		<Card className='p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<div
				{...getRootProps()}
				className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'}`}
			>
				<input {...getInputProps()} />
				{preview ? (
					<div className='relative w-full h-64'>
						<Image
							src={preview}
							alt='Preview'
							fill
							className='object-contain rounded-md'
						/>
					</div>
				) : (
					<div className='flex flex-col items-center justify-center space-y-4'>
						<Upload className='w-12 h-12 text-gray-400' />
						<p className='text-lg font-medium text-gray-600 dark:text-gray-300'>Drag & drop an image here, or click to select one</p>
						<p className='text-sm text-gray-500 dark:text-gray-400'>Supports: JPG, PNG, WebP</p>
					</div>
				)}
			</div>
			{preview && (
				<Button
					onClick={() => {
						setPreview(null);
						onRemoveImage();
					}}
					className='mt-4'
					variant='outline'
				>
					<X className='w-4 h-4 mr-2' />
					Remove Image
				</Button>
			)}
		</Card>
	);
}
