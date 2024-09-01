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
        <div className="relative w-full rounded-md border bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <p className="absolute left-0 top-0 bg-yellow-300 px-3 py-1">カテゴリー</p>
          <h1 className="my-3 text-3xl font-bold">
            {formData.title ? formData.title : "ここにタイトルが入ります"}
          </h1>
          <div className="mb-[15px] mt-[10px] flex items-center justify-between">
            <time className="flex items-center justify-between gap-3">
              <Timer size={18} />
              {format(now, "yyyy/MM/dd")}
            </time>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-9 border">
                <AvatarImage src={session.user.image!} className="size-9" />
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{session.user.name}</h2>
            </div>
          </div>
          <div>
            <div className="space-y-8">
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
