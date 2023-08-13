import { Box, Button, Heading } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { logOut } from 'redux/actions/authActions';

const DashboardPage = (props) => {
	const { logOut } = props;

	const handleLogOut = async () => await logOut();

	return (
		<Box>
			<Heading>Dashboard</Heading>
			<Button onClick={handleLogOut}>Log out</Button>
		</Box>
	);
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logOut })(DashboardPage);
