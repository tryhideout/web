import { initializeApp } from 'firebase/app';

interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	appId: string;
}

const firebaseConfig: FirebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
	appId: process.env.REACT_APP_FIREBASE_APP_ID!,
};

initializeApp(firebaseConfig);
