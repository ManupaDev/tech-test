"use client";

import { Button } from "@/components/ui/button";
import { getMedia, getUser, signOutUserFromApp } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["USER"],
    queryFn: getUser,
    onError: () => router.push("/auth/sign-in"),
  });

  const { data: media, isLoading: isMediaLoading } = useQuery({
    queryKey: ["MEDIA"],
    queryFn: getMedia,
    enabled: !!data,
  });

  const { mutate } = useMutation({
    mutationFn: signOutUserFromApp,
    onSuccess: () => router.push("/auth/sign-in"),
  });

  const handleSignOut = () => {
    mutate();
  };

  if (isLoading && isMediaLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl">Hi, {data?.name}</h1>
          <p className="text-2xl">Nice to meet you. 😃</p>
        </div>
        <div>
          <Button variant={"outline"} onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <div className="py-4 pr-4 gap-x-4 grid grid-cols-2 mt-4">
        {media?.map((el, i) => (
          <ImageSection key={i} number={el.number} media={el.media} />
        ))}
      </div>
    </div>
  );
}

function ImageSection({
  number,
  media,
}: {
  number: number;
  media: { id: string; image: string; number: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Activities recommended for {number}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {media.map((el) => (
          <Image
            key={el.id}
            src={el.image}
            alt=""
            width={600}
            height={600}
            className="rounded-lg"
          />
        ))}
      </CardContent>
    </Card>
  );
}
