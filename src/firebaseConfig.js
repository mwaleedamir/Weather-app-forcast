import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDQvV7lnEQTTxrLH4DrtLJzB1Ly0RQlK34",
  authDomain: "weather-app-f319f.firebaseapp.com",
  projectId: "weather-app-f319f",
  storageBucket: "weather-app-f319f.appspot.com",
  messagingSenderId: "747363912155",
  appId: "1:747363912155:web:c5055928dc5f540c40fffe",
  measurementId: "G-F54KSVB24H"
};
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app); 

    export { app, auth, db };



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDQvV7lnEQTTxrLH4DrtLJzB1Ly0RQlK34",
//   authDomain: "weather-app-f319f.firebaseapp.com",
//   projectId: "weather-app-f319f",
//   storageBucket: "weather-app-f319f.appspot.com",
//   messagingSenderId: "747363912155",
//   appId: "1:747363912155:web:c5055928dc5f540c40fffe",
//   measurementId: "G-F54KSVB24H"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);