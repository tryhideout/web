import { UseToastOptions, createStandaloneToast } from '@chakra-ui/react';
import theme from '@/config/theme';
import { ToastDefaultOptions } from '@/utils/constants';

const { toast } = createStandaloneToast({ theme, defaultOptions: ToastDefaultOptions as UseToastOptions });

export class CustomError extends Error {
	body: string;

	constructor(body: string) {
		super();
		this.body = body;
		this.name = 'CustomError';
	}

	toast = () => toast({ title: 'An error occurred.', description: this.body, status: 'error' });
}
