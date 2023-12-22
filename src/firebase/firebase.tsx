import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
};
const logout = (): void => {
  signOut(auth);
};
export { auth, db, registerWithEmailAndPassword, logout };
