import { signUpUserWithEmailAndPassword } from "@/firebase/auth";
import { RegisterUserMutationDTO } from "./types";

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
