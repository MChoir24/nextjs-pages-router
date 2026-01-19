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
import bcrypt from "bcrypt";

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

type UserData = {
  email: string;
  password: string;
  name: string;
  role?: string;
};

type SignUpCallback = (response: {
  status: boolean;
  message: string;
  id?: string;
}) => void;

export async function signUpUser(userData: UserData, callback: SignUpCallback) {
  // Check if user already exists
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const userExists = querySnapshot.docs.some(
    (doc) => doc.data().email === userData.email
  );

  if (userExists) {
    callback({ status: false, message: "User already exists!" });
    return;
  }

  try {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user"; // default role
    const docRef = await addDoc(collection(db, "users"), userData);
    callback({
      status: true,
      message: "User registered successfully",
      id: docRef.id,
    });
  } catch (error) {
    callback({ status: false, message: "Error registering user" });
  }
}
