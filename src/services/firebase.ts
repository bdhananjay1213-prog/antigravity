import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBT2gK299FfNH8_qtcJyDiYTSRKOFtVwVw",
    authDomain: "kerala-transport-app-aaee4.firebaseapp.com",
    projectId: "kerala-transport-app-aaee4",
    storageBucket: "kerala-transport-app-aaee4.firebasestorage.app",
    messagingSenderId: "976212427868",
    appId: "1:976212427868:web:29292be2aa455d68025299",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { doc, getDoc } from "firebase/firestore";

export const getUserRole = async () => {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    return snap.exists() ? snap.data().role : "user";
};

