// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  setDoc,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { METHODS } from "http";
import { TicketItem } from "../modules/tickets";

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

export const updateProduct = async (
  code: string,
  name: string,
  price: number
) => {
  await setDoc(
    doc(db, "products", code),
    {
      code: code,
      name: name,
      price: price,
    },
    { merge: true }
  );
};

export type Sale = {
  date: Timestamp;
  items: TicketItem[];
  method: string;
  value: number;
  totalWeight?: number;
};

export const storeSale = async (
  method: string,
  value: number,
  items: TicketItem[]
) => {
  const now = new Date();
  const totalWeight = items.reduce(
    (acc, item) => (isNaN(item.weight) ? acc : acc + item.weight),
    0
  );
  await setDoc(doc(db, "sales", now.toString()), {
    date: now,
    items: items,
    method: method,
    value: value,
    totalWeight: totalWeight,
  });
  await incrementStatistics(now, value, method, totalWeight);
};

export const fetchSalesByDate = async (date: Date) => {
  const dayBefore = new Date(date);
  dayBefore.setDate(dayBefore.getDate() - 1);
  const salesCollection = collection(db, "sales");
  const salesQuery = query(
    salesCollection,
    orderBy("date", "desc"),
    where("date", ">", dayBefore),
    where("date", "<=", date)
  );
  const querySnapshot = await getDocs(salesQuery);
  console.log(querySnapshot);
  return querySnapshot.docs.map((doc) => doc.data() as Sale);
};

export type Statistics = {
  value: number;
  weight: number;
  debit: number;
  credit: number;
  cash: number;
};

export const fetchStatisticsByDate = async (date: Date) => {
  const docRef = doc(db, "statistics", date.toDateString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let result = docSnap.data() as Statistics;
    result.debit = result.debit ?? 0;
    result.credit = result.credit ?? 0;
    result.cash = result.cash ?? 0;
    return result;
  } else {
    return {
      value: 0,
      weight: 0,
      debit: 0,
      credit: 0,
      cash: 0,
    };
  }
};

export const incrementStatistics = async (
  date: Date,
  addedValue: number,
  method: string,
  addedWeight?: number
) => {
  const docRef = doc(db, "statistics", date.toDateString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { value, weight } = docSnap.data();
    await setDoc(
      docRef,
      {
        value: Math.round((value + addedValue) * 100) / 100,
        weight: Math.round((weight + addedWeight) * 100) / 100,
        [method]: (docSnap.data()[method] ?? 0) + 1,
      },
      { merge: true }
    );
  } else {
    await setDoc(docRef, {
      value: addedValue,
      weight: addedWeight,
      [method]: 1,
    });
  }
};
