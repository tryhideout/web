import { extendTheme } from '@chakra-ui/react';
import fonts from 'config/fonts.css';

const theme = extendTheme({
	colors: {
		gradient: {
			400: 'linear-gradient(180deg, #F8A11E 0%, #F8861E 100%)',
			500: 'linear-gradient(180deg, #1E82F8 0%, #1E68F8 100%)',
		},
	},
	fonts: {
		heading: `'Hellix'`,
		body: `'Hellix'`,
	},
	components: {
		Button: {
			baseStyle: {
				fontFamily: 'Hellix',
			},
			sizes: {
				xl: {
					height: '60px',
					borderRadius: '16px',
					padding: '0px 32px',
					fontSize: '24px',
				},
				lg: {
					borderRadius: '16px',
				},
				md: {
					borderRadius: '12px',
				},
				sm: {
					borderRadius: '10px',
				},
			},
			variants: {
				gradient400: {
					background: 'gradient.400',
					color: 'white',
					_hover: {
						filter: 'brightness(102%)',
					},
				},
				gradient500: {
					background: 'gradient.500',
					color: 'white',
					_hover: {
						filter: 'brightness(102%)',
					},
				},
				black: {
					background: 'black',
					color: 'white',
					_hover: {
						opacity: '85%',
					},
				},
			},
			defaultProps: {
				size: 'xl',
				variant: 'gradient',
			},
		},
		Input: {
			sizes: {
				xl: {
					field: {
						height: '60px',
						padding: '14px 26px',
						borderRadius: '14px',
						fontSize: '20px',
					},
				},
				lg: {
					field: {
						borderRadius: '12px',
						fontSize: '16px',
					},
				},
				md: {
					field: {
						borderRadius: '10px',
						fontSize: '14px',
					},
				},
				sm: {
					field: {
						borderRadius: '8px',
						fontSize: '12px',
					},
				},
			},
			variants: {
				filled: {
					field: {
						background: 'rgba(212, 213, 219, 0.4)',
						fontFamily: 'Hellix',
						color: 'gray.600',
						fontWeight: '500',
						border: 'none',
						_hover: {
							background: 'rgba(212, 213, 219, 0.4)',
						},
						_disabled: {
							opacity: '90%',
						},
						_focus: {
							background: 'rgba(212, 213, 219, 0.4)',
							border: 'none',
						},
						_placeholder: {
							color: 'gray.500',
							fontWeight: '500',
						},
					},
				},
			},
			defaultProps: {
				size: 'xl',
				variant: 'filled',
			},
		},
		Link: {
			baseStyle: {
				_hover: {
					textDecoration: 'none',
				},
			},
		},
	},
});

export default theme;
