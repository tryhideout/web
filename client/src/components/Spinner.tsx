import { Box, Image } from '@chakra-ui/react';
import styles from '@/components/Spinner.module.css';
import logo from '@/assets/images/logo.svg';

const Spinner = ({ size, useLogo }: { size: number; useLogo: boolean }) => {
	return useLogo ? (
		<Box className={styles.logoSpinner}>
			<Image src={logo} width={`${size}px`} maxWidth={`${size}px`} height={`${size}px`} />
		</Box>
	) : (
		<Box className={styles.standardSpinner} />
	);
};

export default Spinner;
