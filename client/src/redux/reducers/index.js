import userReducer from 'redux/reducers/userReducer';
import hideoutReducer from 'redux/reducers/hideoutReducer';

const rootReducer = {
	user: userReducer,
	hideout: hideoutReducer,
};

export default rootReducer;
