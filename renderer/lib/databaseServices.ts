// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchProductsList = async () => {
  const productsCollection = collection(db, "products");
  const productsSnaphot = await getDocs(productsCollection);
  const productsList = productsSnaphot.docs.map((doc) => doc.data());
  return productsList;
};

export const fetchTicketModel = async () => {
  const docRef = doc(db, "ticket", "model");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
  }
};

export const addNewProduct = async (
  code: string,
  name: string,
  price: number
) => {
  await setDoc(doc(db, "products", code), {
    code: code,
    name: name,
    price: price,
  });
};
