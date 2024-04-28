import { initializeApp } from 'firebase/app';

interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	appId: string;
}

const firebaseConfig: FirebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
