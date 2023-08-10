import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const Protected = ({ children, auth }) => {
	const { pathname } = useLocation();

	return auth.isLoggedIn ? children : <Navigate to={'/auth/login?redirect=' + pathname} />;
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Protected);
