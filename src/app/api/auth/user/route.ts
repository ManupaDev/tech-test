import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const uidSearchParam = z
      .string()
      .safeParse(request.nextUrl.searchParams.get("uid"));
    if (!uidSearchParam.success) {
      return new Response(null, {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const uid = uidSearchParam.data;
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
    });
    if (!user) {
      return new Response(null, {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(user), {
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
