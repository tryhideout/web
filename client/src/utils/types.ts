import { store } from '@/redux/store';
import { AuthProviderIDs, ToastStatuses } from '@/utils/constants';

export type Nullable<T> = {
	[K in keyof T]: null;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Model & API Request / Response Types
export interface User {
	id: number | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
	hideoutID: number | null;
	status: 'available' | 'busy' | 'away' | 'do_not_disturb' | null;
}

export interface UsersAPIRequest {
	email: string;
	password?: string;
	social_token?: string;
	first_name: string;
	last_name: string;
}

export interface UsersAPIResponse {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	hideout_id: number | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
	status: 'available' | 'busy' | 'away' | 'do_not_disturb' | null;
}

export interface APIResponseError {
	data: {
		error: string;
	};
	status: number;
}

export interface Hideout {
	id: number | null;
	name: string | null;
	ownerID: number | null;
	joinCode: string | null;
}

export interface HideoutsAPIRequest {
	name: string;
	owner_id: number;
}

export interface HideoutsAPIResponse {
	id: number;
	name: string;
	owner_id: number;
	join_code: string;
}

export interface Chore {
	id: number | null;
	name: string | null;
	description: string | null;
	dueDate: string | null;
	assigneeID: number | null;
	hideoutID: number | null;
	status: 'backlog' | 'in_progress' | 'completed' | null;
}

export interface ChoresAPIRequest {
	name: string;
	description: string | null;
	due_date: string | null;
	assignee_id: number | null;
	hideout_id: number;
	status: 'backlog' | 'in_progress' | 'completed';
}

export interface ChoresAPIResponse {
	id: number;
	name: string;
	description: string | null;
	due_date: string | null;
	assignee_id: number | null;
	hideout_id: number;
	status: 'backlog' | 'in_progress' | 'completed';
}

export interface ChoresReduxStore {
	[key: number]: Chore;
}

export interface Expense {
	id: number | null;
	name: string | null;
	amount: number | null;
	dueDate: string | null;
	debtorID: number | null;
	creditorID: number | null;
	hideoutID: number | null;
	comments: string | null;
	active: boolean | null;
}

export interface ExpensesAPIRequest {
	name: string;
	amount: number;
	due_date: string | null;
	debtor_id: number | null;
	creditor_id: number | null;
	hideout_id: number;
	comments: string | null;
	active: boolean;
}

export interface ExpensesAPIResponse {
	id: number;
	name: string;
	amount: number;
	due_date: string | null;
	debtor_id: number | null;
	creditor_id: number | null;
	hideout_id: number;
	comments: string | null;
	active: boolean;
}

export interface ExpensesReduxStore {
	[key: number]: Expense;
}

export interface Session {
	isLoggedIn: boolean | null;
	accessToken: string | null;
	userID: number | null;
}

export interface SessionsAPIEmailLoginRequest {
	email: string;
	password: string;
}

export interface SessionsAPISocialLoginRequest {
	email: string;
	social_token: string;
}

export interface SessionsAPIResponse {
	user_id: number;
	access_token: string;
}

export type APIResponses = UsersAPIResponse | SessionsAPIResponse | HideoutsAPIResponse;

// Internal helper types
export type toastStatus =
	| ToastStatuses.info
	| ToastStatuses.loading
	| ToastStatuses.warning
	| ToastStatuses.error
	| ToastStatuses.success;
export interface RequestToastMessages {
	success: {
		toastStatus: toastStatus;
		toastDescription: string;
	} | null;
	error: {
		[key: number]: {
			toastStatus: toastStatus;
			toastDescription: string;
		};
	};
}

export interface RequestHandlerRefreshOptions {
	skipSessionRefresh?: true;
	skipUserRefresh?: true;
}

// Domain-specific State & Toast Types
export type FirebaseProviderID = AuthProviderIDs.GOOGLE | AuthProviderIDs.FACEBOOK | AuthProviderIDs.GITHUB;

export interface SignupFormState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface OnboardingJoinFormState {
	joinCode: string;
}

export interface OnboardingCreateFormState {
	hideoutName: string;
}

export interface LoginFormState {
	email: string;
	password: string;
}
