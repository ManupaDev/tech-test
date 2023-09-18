import {
  getCurrentUser,
  signInUserWithEmailAndPassword,
  signOutUser,
  signUpUserWithEmailAndPassword,
} from "@/firebase/auth";
import {
  LoginUserMutationDTO,
  NumberMediaSchema,
  PrismaUserSchema,
  RegisterUserMutationDTO,
} from "./types";

import ky from "ky";

export const signUpUser = async (user: RegisterUserMutationDTO) => {
  if (user.password !== user.confirmPassword) {
    throw new Error("Confirm password does not match with Password");
  }
  const currentUser = await signUpUserWithEmailAndPassword(
    user.email,
    user.password
  );

  await ky
    .post("/api/auth/sign-up", {
      json: {
        uid: currentUser.uid,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    })
    .json();
};

export const signInUser = async (user: LoginUserMutationDTO) => {
  await signInUserWithEmailAndPassword(user.email, user.password);
};

export const getUser = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const res = await ky.get(`/api/auth/user?uid=${currentUser.uid}`);
  const dbUser = PrismaUserSchema.parse(await res.json());
  return dbUser;
};

export const signOutUserFromApp = async () => {
  await signOutUser();
};

export const getMedia = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const res = await ky.get(`/api/media?uid=${currentUser.uid}`);
  const data = NumberMediaSchema.array().parse(await res.json());
  return data;
};
