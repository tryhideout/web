import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetUserQuery } from '@/redux/api/users';

import { RootState } from '@/utils/types';

const Protected = ({ children }: { children: ReactElement }) => {
	const { pathname } = useLocation();
	const session = useSelector((state: RootState) => state.session);
	const currentUser = useSelector((state: RootState) => state.user);
	useGetUserQuery(session.userID!, { skip: !session.isLoggedIn || currentUser.id !== null });

	const getRenderContent = () => {
		if (currentUser.hideoutID === null && (!pathname.includes('onboarding') || pathname.includes('invite')))
			return <Navigate to={'/onboarding/join'} />;
		else if (currentUser.hideoutID !== null && pathname.includes('onboarding')) return <Navigate to={'/app/expenses'} />;
		return children;
	};

	return session.isLoggedIn ? getRenderContent() : <Navigate to={'/auth/login?redirect=' + pathname} />;
};

export default Protected;
