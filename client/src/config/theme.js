import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	colors: {
		gradient: 'linear-gradient(180deg, #F8A11E 0%, #F8861E 100%)',
	},
	fonts: {
		heading: `'Hellix', sans-serif`,
		body: `'Hubot', sans-serif`,
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
				gradient: {
					background: 'gradient',
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
	},
});

export default theme;
