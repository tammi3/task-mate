import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  Timestamp,
  getDocs,
  arrayUnion,
  arrayRemove,
  getAggregateFromServer,
  sum,
  runTransaction
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCuTOcftYiZltE_N-XdRtxnxsarJFE6qcI',
  authDomain: 'task-manager-hbb.firebaseapp.com',
  projectId: 'task-manager-hbb',
  storageBucket: 'task-manager-hbb.appspot.com',
  messagingSenderId: '621704746156',
  appId: '1:621704746156:web:49e659592ec5873bae3b09',
  measurementId: 'G-D1MJCYKQ1D'
}

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export {
  auth,
  db,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  storage,
  addDoc,
  getDoc,
  getDocs,
  uploadBytes,
  deleteObject,
  runTransaction,
  getDownloadURL,
  ref,
  query,
  where,
  deleteUser,
  deleteDoc,
  collection,
  Timestamp,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getAggregateFromServer,
  sum,
  arrayUnion,
  arrayRemove,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
