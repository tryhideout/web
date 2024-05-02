import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	AuthProvider,
	getAdditionalUserInfo,
	User,
	deleteUser,
} from 'firebase/auth';

import { FirebaseProviderID } from '@/utils/types';
import { AuthProviderIDs, ProviderScopes } from '@/utils/constants';
import { FirebaseError } from 'firebase/app';
import { CustomError } from '@/utils/exceptions';

class FirebaseAuthFlow {
	providerID: FirebaseProviderID;
	authProvider: AuthProvider;
	currentUser: User | null;

	constructor(providerID: FirebaseProviderID) {
		this.providerID = providerID;
		this.authProvider = this.#generateProvider(providerID);
		this.currentUser = null;
	}

	trigger = async () => {
		const auth = getAuth();
		try {
			const result = await signInWithPopup(auth, this.authProvider);
			const currentUser = result.user;
			this.currentUser = currentUser;
			const additionalInfo = getAdditionalUserInfo(result);

			const socialToken = await currentUser.getIdToken();

			return { currentUser, additionalInfo, socialToken };
		} catch (error) {
			throw new CustomError((error as FirebaseError).code);
		}
	};

	cancel = async () => {
		if (!this.currentUser) throw new CustomError('Auth flow cannot be cancelled before user creation.');
		try {
			await deleteUser(this.currentUser);
		} catch (error) {
			throw new CustomError((error as FirebaseError).code);
		}
	};

	#generateProvider = (providerID: FirebaseProviderID) => {
		let provider;
		switch (providerID) {
			case AuthProviderIDs.GOOGLE:
				provider = new GoogleAuthProvider();
				break;
			case AuthProviderIDs.FACEBOOK:
				provider = new FacebookAuthProvider();
				break;
			default:
				provider = new GithubAuthProvider();
		}
		provider.addScope(ProviderScopes[providerID].EMAIL);
		provider.addScope(ProviderScopes[providerID].PROFILE);
		return provider;
	};
}

export default FirebaseAuthFlow;
