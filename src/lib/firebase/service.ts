import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
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

export async function getUserByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  const userDoc = querySnapshot.docs[0];
  return { id: userDoc.id, ...userDoc.data() };
}

type UserData = {
  id?: string;
  email: string;
  password: string;
  name: string;
  role?: string;
  type?: string;
};

type ServiceCallback = (response: {
  status: boolean;
  message: string;
  id?: string;
  data?: unknown;
}) => void;

export async function signUpUser(
  userData: UserData,
  callback: ServiceCallback,
) {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);
  const userExists = existingUser !== null;
  console.log(userExists);

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
    callback({ status: false, message: `Error registering user: ${error}` });
  }
}

export async function signInUser(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  console.log(existingUser);

  if (!existingUser) {
    return null;
  }

  // Verify password
  const userData = existingUser as UserData;
  const isPasswordValid = await bcrypt.compare(password, userData.password); // Compare hashed passwords

  if (!isPasswordValid) {
    return null;
  }
  return existingUser;
}

export async function signInWithGoogle(
  userData: UserData,
  callback: ServiceCallback,
) {
  // Check if user already exists
  const existingUser = (await getUserByEmail(
    userData.email,
  )) as UserData | null;
  const userExists = existingUser !== null;
  if (userExists) {
    try {
      userData.role = existingUser!.role;
      // update existing user data if needed
      await updateDoc(doc(db, "users", existingUser!.id), userData);

      callback({
        status: true,
        message: "User signed in successfully",
        id: existingUser!.id,
        data: existingUser,
      });
      return;
    } catch (error) {
      callback({ status: false, message: `Error signing in user: ${error}` });
      return;
    }
  }

  try {
    userData.role = "user"; // default role
    userData.type = "google"; // default type
    const docRef = await addDoc(collection(db, "users"), userData);
    callback({
      status: true,
      message: "User registered successfully",
      id: docRef.id,
    });
  } catch (error) {
    callback({ status: false, message: `Error registering user: ${error}` });
  }
}
