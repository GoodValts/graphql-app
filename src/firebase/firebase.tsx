import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCEWeygQUpvvKlpxXypzp0-25VZq4vPzw',
  authDomain: 'phoenixgraphql.firebaseapp.com',
  projectId: 'phoenixgraphql',
  storageBucket: 'phoenixgraphql.appspot.com',
  messagingSenderId: '397467268875',
  appId: '1:397467268875:web:f94ed5f3fb85bce02c540e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = (): void => {
  signOut(auth);
};
export { auth, db, logout };
