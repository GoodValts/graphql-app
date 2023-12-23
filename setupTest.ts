import '@testing-library/jest-dom';


jest.mock('firebase/app', () => ({
    initializeApp: jest.fn() as jest.Mock,
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn() as jest.Mock,
    createUserWithEmailAndPassword: jest.fn() as jest.Mock,
    signOut: jest.fn() as jest.Mock,
    signInWithEmailAndPassword: jest.fn() as jest.Mock,
  }));
  
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn() as jest.Mock,
    collection: jest.fn() as jest.Mock,
    addDoc: jest.fn() as jest.Mock,
  }));

  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn() as jest.Mock,
    collection: jest.fn() as jest.Mock,
    addDoc: jest.fn() as jest.Mock,
  }));
