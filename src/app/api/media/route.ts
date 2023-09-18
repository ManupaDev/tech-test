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
    const mediaNum1 = await prisma.media.findMany({
      where: {
        number: user.number1,
      },
    });

    const mediaNum2 = await prisma.media.findMany({
      where: {
        number: user.number2,
      },
    });

    return new Response(
      JSON.stringify([
        { number: user.number1, media: mediaNum1 },
        { number: user.number2, media: mediaNum2 },
      ]),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, number } = body;
    const newMedia = await prisma.media.create({
      data: {
        image,
        number,
      },
    });

    return new Response(JSON.stringify(newMedia), {
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
