import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCnzIVwxhktQcMCv8o72kFAQGCvIY2bGnM',
  authDomain: 'cosh-c827a.firebaseapp.com',
  projectId: 'cosh-c827a',
  storageBucket: 'cosh-c827a.appspot.com',
  messagingSenderId: '316784870707',
  appId: '1:316784870707:web:0ed314a3d669e6394caa46',
  measurementId: 'G-7MPWJL6SKT',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
