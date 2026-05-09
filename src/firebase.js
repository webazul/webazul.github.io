import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDFbRquFlASuXYeUDQBR-9M2fR6HzGtw88",
  authDomain: "webazul.firebaseapp.com",
  projectId: "webazul",
  storageBucket: "webazul-briefings",
  messagingSenderId: "62497141546",
  appId: "1:62497141546:web:4ba05ba8f93eed95d8a453"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
