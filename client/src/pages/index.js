export { default as LandingPage } from 'pages/LandingPage';
export { default as LoginPage } from 'pages/LoginPage';
export { default as SignupPage } from 'pages/SignupPage';
export { default as ChoresPage } from 'pages/ChoresPage';
export { default as ExpensesPage } from 'pages/ExpensesPage';
export { default as OnboardingCreatePage } from 'pages/OnboardingCreatePage';
export { default as OnboardingInvitePage } from 'pages/OnboardingInvitePage';
export { default as OnboardingJoinPage } from 'pages/OnboardingJoinPage';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
