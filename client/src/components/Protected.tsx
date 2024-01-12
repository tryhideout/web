import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ children }: { children: ReactElement }) => {
	const { pathname } = useLocation();

	const getRenderContent = () => {
		// 	if (user.hideoutID === null && !pathname.includes('onboarding')) return <Navigate to={'/onboarding/join'} />;
		// 	else if (user.hideoutID === null && pathname.includes('invite')) return <Navigate to={'/onboarding/join'} />;
		// 	else if (user.hideoutID !== null && pathname.includes('onboarding')) return <Navigate to={'/app/expenses'} />;
		return children;
	};

	return true ? getRenderContent() : <Navigate to={'/auth/login?redirect=' + pathname} />;
};

export default Protected;
