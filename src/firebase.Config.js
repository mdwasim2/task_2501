// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKpuS1HzNMYkZsvcUDaimyoc-EyVdKbOM",
  authDomain: "chattingapp-8e791.firebaseapp.com",
  projectId: "chattingapp-8e791",
  storageBucket: "chattingapp-8e791.firebasestorage.app",
  messagingSenderId: "766399874035",
  appId: "1:766399874035:web:a2d1ff73159bc9a0d54886",
  measurementId: "G-9ZLW78WCJD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;