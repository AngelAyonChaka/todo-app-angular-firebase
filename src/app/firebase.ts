import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD99I9c3Mn6v_OCrF_WU5BSr2sxdQ6Iu1E",
  authDomain: "todo-app-1febf.firebaseapp.com",
  projectId: "todo-app-1febf",
  storageBucket: "todo-app-1febf.firebasestorage.app",
  messagingSenderId: "562215678193",
  appId: "1:562215678193:web:e19dd3e85539c2fb667950"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);