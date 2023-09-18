import ky from "ky";
import { RegisterUserDTO } from "./types";

export const registerUser = async (user: RegisterUserDTO) => {
  const data = await ky.post("/api/auth/register", { json: user }).json();
};
