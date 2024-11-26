import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSy5kAimo79VZNJS_i2mlNHPm_jrB2OA",
  authDomain: "react-native-final-5d438.firebaseapp.com",
  projectId: "react-native-final-5d438",
  databaseURL: "https://react-native-final-5d438-default-rtdb.firebaseio.com/",
  storageBucket: "react-native-final-5d438.firebasestorage.app",
  messagingSenderId: "1095916393976",
  appId: "1:1095916393976:web:f571a433ea67396fb1720d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

