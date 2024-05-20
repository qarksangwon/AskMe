import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Firebase Storage 모듈 추가

const firebaseConfig = {
  apiKey: "AIzaSyDN4XAUKZ2qHpr8KHVDgwh-3CoAP-0I3yI",
  authDomain: "askme-1243d.firebaseapp.com",
  projectId: "askme-1243d",
  storageBucket: "askme-1243d.appspot.com",
  messagingSenderId: "58957171233",
  appId: "1:58957171233:web:3aef7d2b699adbe360f160",
  measurementId: "G-73YKZM252L",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
