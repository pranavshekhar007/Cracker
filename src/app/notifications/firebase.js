import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAnwKVf0VgeTxm1RtG16QFiZ-UvKjTR_go",
  authDomain: "pushnotifications-1ac31.firebaseapp.com",
  projectId: "pushnotifications-1ac31",
  storageBucket: "pushnotifications-1ac31.appspot.com",
  messagingSenderId: "70883045579",
  appId: "1:70883045579:web:ffe97140ec450aa18eab4e",
  measurementId: "G-36MQWZ5L90",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

let messaging = null;

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.log("FCM is not supported in this environment.", err);
  }
}

export { messaging };

export const generateToken = async () => {
  if (typeof window !== "undefined" && messaging) {
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BI5pfL_NAVZBRV2YiBWTnaQjg_pQc9Q6TNMIol6dcmZipMgdqb-if2kgx0Jhc4nl5Brhvxu1NdP6bEZjAGvcVTc",
        });
        console.log("FCM Token:", token);
        // TODO: save this token to your backend database
      } catch (err) {
        console.log("An error occurred while retrieving token. ", err);
      }
    }
  }
};
