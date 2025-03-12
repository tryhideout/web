import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdOutlineClearAll, MdOutlineHorizontalRule, MdOutlinePendingActions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import {
	Box,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Checkbox,
} from '@chakra-ui/react';

import { ExpensesViewModes } from '@/utils/constants';
import { Expense, ExpensesReduxStore, RootState } from '@/utils/types';
import { IoCheckmarkDone } from 'react-icons/io5';

const ExpensesTable = ({ isLoading }: { isLoading: boolean }) => {
	const expenses: ExpensesReduxStore = useSelector((state: RootState) => state.expenses);
	const [expensesViewMode, setExpensesViewMode] = useState(ExpensesViewModes.ACTIVE);
	const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);

	const retrieveExpensesByMode = () => {
		const expenseList: Expense[] = Object.values(expenses);
		if (expensesViewMode === ExpensesViewModes.ALL) return expenseList;
		return expenseList.filter((expense) =>
			expensesViewMode === ExpensesViewModes.ACTIVE ? expense.active : !expense.active,
		);
	};

	const expensesByMode = retrieveExpensesByMode();

	const onIndeterminateCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) setSelectedExpenses(expensesByMode.map(({ id }) => id));
		else setSelectedExpenses([]);
	};

	const onRowCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, expenseID: number) => {
		if (e.target.checked) setSelectedExpenses([...selectedExpenses, expenseID]);
		else setSelectedExpenses([...selectedExpenses.filter((id) => id !== expenseID)]);
	};

	return (
		<Box
			width='1200px'
			backgroundColor='white'
			height='66vh'
			borderRadius='20px'
			border='1px solid rgba(212, 213, 219, 0.40)'
			marginTop='40px'
		>
			<Box
				height='70px'
				width='100%'
				borderBottom='1px solid rgba(212, 213, 219, 0.40)'
				display='flex'
				flexDirection='row'
				alignItems='center'
			>
				<Menu computePositionOnMount modifiers={[{ name: 'offset', options: { offset: [0, 0] } }]}>
					<MenuButton
						as={Button}
						background='transparent'
						fontFamily='Hellix'
						fontSize='1.25rem'
						fontWeight='600'
						color='gray.900'
						rightIcon={<FaChevronDown size={15} />}
						padding='0'
						height='40px'
						marginLeft='34px'
					>
						{expensesViewMode} Expenses
					</MenuButton>
					<MenuList borderRadius='15px' marginRight='20px'>
						<MenuItem
							fontFamily='Hellix'
							fontWeight='500'
							marginBottom='5px'
							icon={<MdOutlinePendingActions size={20} />}
							onClick={() => setExpensesViewMode(ExpensesViewModes.ACTIVE)}
						>
							Active Expenses
						</MenuItem>
						<MenuItem
							icon={<IoCheckmarkDone size={20} />}
							fontWeight='500'
							fontFamily='Hellix'
							marginBottom='5px'
							onClick={() => setExpensesViewMode(ExpensesViewModes.INACTIVE)}
						>
							Inactive Expenses
						</MenuItem>
						<MenuItem
							icon={<MdOutlineClearAll size={20} />}
							fontWeight='500'
							fontFamily='Hellix'
							onClick={() => setExpensesViewMode(ExpensesViewModes.ALL)}
						>
							All Expenses
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
			<Box maxH='570px' overflowY='auto'>
				<TableContainer maxHeight='450px' overflowY='scroll'>
					<Table variant='simple' marginLeft='10px'>
						<Thead position='sticky' top='0' bg='white' borderBottom='1px solid rgba(212, 213, 219, 0.40)'>
							<Tr>
								<Th>
									<Checkbox
										size='lg'
										borderRadius='6px'
										colorScheme='orange'
										onChange={onIndeterminateCheckboxChange}
										isChecked={selectedExpenses.length === expensesByMode.length}
									/>
								</Th>
								<Th isTruncated>Name</Th>
								<Th>Amount</Th>
								<Th>Due Date</Th>
								<Th>Debtor</Th>
								<Th>Creditor</Th>
								<Th>Actions</Th>
							</Tr>
						</Thead>
						<Tbody maxHeight='450px' overflowY='scroll'>
							{expensesByMode.map((expense) => (
								<Tr fontFamily='Hellix' key={expense.id}>
									<Td>
										<Checkbox
											size='lg'
											colorScheme='orange'
											onChange={(event) => onRowCheckboxChange(event, expense.id)}
											isChecked={selectedExpenses.includes(expense.id)}
										/>
									</Td>
									<Td fontWeight='600'>{expense.name}</Td>
									<Td>{expense.amount}</Td>
									<Td>{expense.dueDate}</Td>
									<Td>{expense.debtorID}</Td>
									<Td>{expense.creditorID}</Td>
									<Td>Actions</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default ExpensesTable;
