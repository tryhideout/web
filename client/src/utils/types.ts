import { store } from 'redux/store';

export interface ReducerInput {
	type: string;
	success: boolean;
	payload: any;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
