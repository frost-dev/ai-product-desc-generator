import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DescriptionDisplayProps {
	description: string | null | undefined;
	isLoading: boolean;
	error: string | null;
}

export function DescriptionDisplay({ description, isLoading, error }: DescriptionDisplayProps) {
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold'>Product Description</CardTitle>
			</CardHeader>
			<CardContent>
				{error && <p className='text-red-500 dark:text-red-400'>{error}</p>}
				{isLoading ? (
					<div className='space-y-2'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-3/4' />
					</div>
				) : description ? (
					<p className='whitespace-pre-wrap text-gray-700 dark:text-gray-300'>{description}</p>
				) : (
					<p className='text-gray-500 dark:text-gray-400'>Upload an image and click &quot;Generate Description&quot; to see the result.</p>
				)}
			</CardContent>
		</Card>
	);
}
