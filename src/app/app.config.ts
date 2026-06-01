import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyD99I9c3Mn6v_OCrF_WU5BSr2sxdQ6Iu1E",
  authDomain: "todo-app-1febf.firebaseapp.com",
  projectId: "todo-app-1febf",
  storageBucket: "todo-app-1febf.firebasestorage.app",
  messagingSenderId: "562215678193",
  appId: "1:562215678193:web:e19dd3e85539c2fb667950"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};