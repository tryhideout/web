import { createStandaloneToast } from '@chakra-ui/react';
import theme from 'config/theme';
const { toast } = createStandaloneToast({ theme });

const error = (title, description = null) => {
	toast({
		title: title,
		description: description,
		status: 'error',
		duration: 9000,
		isClosable: true,
		position: 'top-right',
	});
};

const success = (title, description = null) => {
	toast({
		title: title,
		description: description,
		status: 'success',
		duration: 9000,
		isClosable: true,
		position: 'top-right',
	});
};

const info = (title, description = null) => {
	toast({
		title: title,
		description: description,
		status: 'info',
		duration: 9000,
		isClosable: true,
		position: 'top-right',
	});
};

const warning = (title, description = null) => {
	toast({
		title: title,
		description: description,
		status: 'warning',
		duration: 9000,
		isClosable: true,
		position: 'top-right',
	});
};

const showToast = {
	error,
	success,
	info,
	warning,
};

export default showToast;
