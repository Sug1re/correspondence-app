// Firebaseの設定
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebaseプロジェクトの設定情報
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firestoreインスタンスの取得
export const db = getFirestore(app);
