import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const Protected = ({ children, user }) => {
	const { pathname } = useLocation();

	const getRenderContent = () => {
		if (user.hideoutID === null && !pathname.includes('onboarding')) return <Navigate to={'/onboarding/join'} />;
		else if (user.hideoutID === null && pathname.includes('invite')) return <Navigate to={'/onboarding/join'} />;
		else if (user.hideoutID !== null && pathname.includes('onboarding')) return <Navigate to={'/app/expenses'} />;
		return children;
	};

	return user.isLoggedIn ? getRenderContent() : <Navigate to={'/auth/login?redirect=' + pathname} />;
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Protected);
