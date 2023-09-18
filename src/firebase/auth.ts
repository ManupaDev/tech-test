import { app } from "./app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  User,
} from "firebase/auth";

export const auth = getAuth(app);

export const getCurrentUser = async () => {
  const promisifiedOnAuthStateChanged = (auth: Auth) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  };

  const user = (await promisifiedOnAuthStateChanged(auth)) as User | null;
  return user;
};

export const signUpUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const signOutUser = async () => {
  await signOut(auth);
};
