import { Box, Image } from '@chakra-ui/react';
import styles from '@/components/Spinner.module.css';
import logo from '@/assets/images/logo.svg';

const Spinner = ({ size }: { size: number }) => {
	return (
		<Box className={styles.pointer}>
			<Image src={logo} width={`${size}px`} maxWidth={`${size}px`} height={`${size}px`} />
		</Box>
	);
};

export default Spinner;
