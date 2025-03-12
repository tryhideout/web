import { Box, Image, Text, Heading, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import moneyIcon from '@/assets/images/expenses-money-icon.svg';
import calculatorIcon from '@/assets/images/expenses-calculator-icon.svg';
import calendarIcon from '@/assets/images/expenses-calendar-icon.svg';
import changeIcon from '@/assets/images/expenses-change-icon.svg';
import { Expense, RootState } from '@/utils/types';

const ExpensesStatsDisplay = ({ isLoading }: { isLoading: boolean }) => {
	const expenses = useSelector((state: RootState) => state.expenses);
	const currentDate = dayjs();

	const sumExpensesAmounts = (expenses: Expense[]) =>
		expenses.reduce((accumulator: number, current: Expense) => accumulator + current.amount!, 0);

	const totalActiveExpenses = sumExpensesAmounts(Object.values(expenses).filter((expense: Expense) => expense.active));
	const activeExpensesCount = Object.keys(expenses).length;
	const remainingDaysInMonth = currentDate.daysInMonth() - currentDate.date();

	const calculateMonthlyExpenseChange = () => {
		const startOfPrevMonth = currentDate.subtract(1, 'month').startOf('month');
		const endOfPrevMonth = currentDate.subtract(1, 'month').endOf('month');

		const totalPreviousMonthExpenses = sumExpensesAmounts(
			Object.values(expenses).filter(
				(expense: Expense) =>
					expense.dueDate !== null &&
					dayjs(expense.dueDate).isAfter(startOfPrevMonth) &&
					dayjs(expense.dueDate).isBefore(endOfPrevMonth),
			),
		);

		const expenseChange = totalActiveExpenses - totalPreviousMonthExpenses;
		return `${expenseChange > 0 ? '+' : '-'}${expenseChange}`;
	};

	const expensesStatisticsData = [
		{
			imageSrc: moneyIcon,
			label: 'Total Active Expenses',
			numerical: totalActiveExpenses,
			suffix: 'CAD',
			showDollarSign: true,
		},
		{
			imageSrc: calculatorIcon,
			label: '# of Active Expenses',
			numerical: activeExpensesCount,
			suffix: 'active',
			showDollarSign: false,
		},
		{
			imageSrc: calendarIcon,
			label: 'Remaining Billing Period',
			numerical: remainingDaysInMonth,
			suffix: 'days left',
			showDollarSign: false,
		},
		{
			imageSrc: changeIcon,
			label: 'Monthly Expense Change',
			numerical: calculateMonthlyExpenseChange(),
			suffix: 'CAD',
			showDollarSign: true,
		},
	];

	const generateStatisticBox = ({
		imageSrc,
		label,
		numerical,
		suffix,
		showDollarSign,
	}: {
		imageSrc: string;
		label: string;
		numerical: number | string;
		suffix: string;
		showDollarSign: boolean;
	}) => (
		<Box
			display='flex'
			flexDir='row'
			alignItems='center'
			padding='20px 30px 20px 20px'
			border='1px solid rgba(212, 213, 219, 0.40)'
			backgroundColor='white'
			borderRadius='18px'
			height='fit-content'
			key={label}
		>
			<Image height='40px' width='40px' src={imageSrc} />
			<Box display='flex' flexDir='column' alignItems='start' marginLeft='23px'>
				<Text fontFamily='Hellix' fontSize='14px' fontWeight={500} color='gray.500'>
					{label}
				</Text>
				<Box display='flex' flexDir='row' alignItems='center' marginTop='2px' marginBottom='14px'>
					<Skeleton height='20px' width='120px' borderRadius='4px' isLoaded={!isLoading}>
						<Box display='flex' flexDir='row' alignItems='center' marginTop='2px'>
							{showDollarSign && (
								<Heading fontFamily='Hellix' fontSize='20px' color='gray.500' fontWeight={600} marginRight='10px'>
									$
								</Heading>
							)}
							<Heading fontFamily='Hellix' fontSize='30px' fontWeight={600}>
								{numerical}
							</Heading>
							<Heading fontFamily='Hellix' fontSize='20px' fontWeight={500} marginLeft='4px'>
								{suffix}
							</Heading>
						</Box>
					</Skeleton>
				</Box>
			</Box>
		</Box>
	);

	return (
		<Box
			display='flex'
			flexDir='row'
			width='100%'
			alignItems='center'
			justifyContent='space-between'
			marginTop='32px'
			paddingLeft='50px'
			paddingRight='50px'
		>
			{expensesStatisticsData.map((statistic) => generateStatisticBox(statistic))}
		</Box>
	);
};

export default ExpensesStatsDisplay;
