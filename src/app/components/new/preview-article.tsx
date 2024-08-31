"use client";

import { format } from "date-fns";
import { Timer } from "lucide-react";
import { useSession } from "next-auth/react";

import PreviewCard from "@/app/components/new/preview-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormData } from "@/types/form-data";

export default function PreviewArticle({ formData }: { formData: FormData }) {
  const { data: session } = useSession();

  if (!session) return <div>認証が必要です</div>;

  const now = new Date();

  return (
    <div className="w-full">
      <div className="flex justify-center px-[10px] py-[20px]">
        <div className="w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <h1 className="mb-3 text-3xl font-bold">{formData.title}</h1>
          <time className="flex items-center gap-2 text-gray-600">
            <Timer size={18} />
            {format(now, "yyyy/MM/dd")}
          </time>
          <div className="mb-[15px] mt-[10px] flex items-center justify-between">
            <div className="flex gap-2">
              <p className="size-fit rounded-full border-2 p-1 px-3">Next.js</p>
              <p className="size-fit rounded-full border-2 p-1 px-3">React</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-10">
                <AvatarImage src={session.user.image!} className="size-10" />
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{session.user.name}</h2>
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            {/* Vertical line connecting the cards */}
            <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-gray-500"></div>
            <div className="z-10 w-full space-y-8">
              {/*後で型作ります*/}
              {formData.nodes.map((node, index) => (
                <PreviewCard key={index} node={node} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
