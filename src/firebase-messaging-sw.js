importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA5zaOwzY523rShD_WRv_hyOyz9YLYNYck",
  authDomain: "drve-test.firebaseapp.com",
  projectId: "drve-test",
  storageBucket: "drve-test.firebasestorage.app",
  messagingSenderId: "601591865009",
  appId: "1:601591865009:web:ea37acfb38c6f8a397cc90",
  measurementId: "G-3EQYHE38HM"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
