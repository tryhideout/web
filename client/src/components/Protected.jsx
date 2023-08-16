import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const Protected = ({ children, user }) => {
	const { pathname } = useLocation();

	return user.isLoggedIn ? children : <Navigate to={'/auth/login?redirect=' + pathname} />;
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Protected);
