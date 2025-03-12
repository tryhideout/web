import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RootState } from '@/utils/types';
import { ExpensesStatsDisplay, ExpensesTable } from '@/containers';
import { useGetAllExpensesByHideoutQuery } from '@/redux/api/expenses';

const ExpensesPage = () => {
	const hideout = useSelector((state: RootState) => state.hideout);
	const { isLoading } = useGetAllExpensesByHideoutQuery(hideout.id!);

	return (
		<Box
			backgroundColor='#FCFBFA'
			borderTop='1px solid #EDF2F7'
			display='flex'
			flexDirection='column'
			alignItems='center'
			height='100vh'
		>
			<ExpensesStatsDisplay isLoading={isLoading} />
			<ExpensesTable isLoading={isLoading} />
		</Box>
	);
};

export default ExpensesPage;
