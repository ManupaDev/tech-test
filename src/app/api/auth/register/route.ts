import { RegisterUserDTOSchema } from "@/lib/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userDTOResult = RegisterUserDTOSchema.safeParse(body);
    if (!userDTOResult.success) {
      return new Response(null, {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log(userDTOResult.data);

    return new Response(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
