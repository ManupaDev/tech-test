import { NextRequest } from "next/server";
import { RegisterUserDTOSchema } from "@/lib/types";
import prisma from "@/lib/prisma";

function generateNonEqualRandomNumbers() {
  let num1 = Math.floor(Math.random() * 5) + 1;
  let num2 = Math.floor(Math.random() * 5) + 1;

  while (num1 === num2) {
    num2 = Math.floor(Math.random() * 5) + 1;
  }

  return [num1, num2];
}
export async function POST(request: NextRequest) {
  try {
    const body = RegisterUserDTOSchema.safeParse(await request.json());
    if (!body.success) {
      return new Response(null, {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const { uid, name, email, phone } = body.data;
    const [number1, number2] = generateNonEqualRandomNumbers();

    await prisma.user.create({
      data: {
        uid,
        name,
        email,
        phone,
        number1,
        number2,
      },
    });
    return new Response(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);

    return new Response(null, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
