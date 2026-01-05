import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import app from "./init";

export const db = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signUpUser( userData: { email: string; password: string; name: string }, callback: Function
) {
  // Check if user already exists
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const userExists = querySnapshot.docs.some(
    (doc) => doc.data().email === userData.email
  );

  if (userExists) {
    callback({ status: false, message: "User already exists" });
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    callback({ status: true, message: "User registered successfully", id: docRef.id });
  } catch (error) {
    callback({ status: false, message: "Error registering user" });
  }
}