import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface ProductNameInputProps {
	value: string;
	onChange: (value: string) => void;
}

export function ProductNameInput({ value, onChange }: ProductNameInputProps) {
	return (
		<Card className='p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<div className='space-y-2'>
				<Label
					htmlFor='product-name'
					className='text-lg font-medium text-gray-700 dark:text-gray-300'
				>
					Product Name
				</Label>
				<Input
					id='product-name'
					placeholder='Enter product name'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className='text-lg py-6 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
				/>
			</div>
		</Card>
	);
}
