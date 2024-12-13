"use client";

import { format } from "date-fns";
import { TagIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import PreviewCard from "@/app/components/new/preview-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FormData } from "./createArticleHome";

export default function PreviewArticle({ formData }: { formData: FormData }) {
  const { data: session } = useSession();

  if (!session) return <div>認証が必要です</div>;

  console.log(formData);

  const now = new Date();

  return (
    <div className="w-full">
      <div className="flex justify-center px-[10px] py-[20px]">
        <div className="relative w-full rounded-md border bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <p className="absolute left-0 top-0 bg-green-300 px-3 py-1">カテゴリー</p>
          <h1 className="my-3 text-3xl font-bold">{formData.title ? formData.title : "ここにタイトルが入ります"}</h1>
          <div className="mb-[5px] flex cursor-pointer items-center gap-3 text-[14px]">
            {formData.tags.map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-1 rounded-sm bg-gray-200 px-2 py-[2px] hover:bg-gray-300"
              >
                <TagIcon size={15} />
                {tag.value}
              </div>
            ))}
          </div>
          <div className="mb-[15px] mt-[10px] flex items-center justify-between">
            <time className="flex items-center justify-between gap-3">投稿日:{format(now, "yyyy/MM/dd")}</time>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-9 border">
                <AvatarImage src={session.user.image!} className="size-9" />
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{session.user.name}</h2>
            </div>
          </div>
          <div>
            <div className="flex h-full gap-10">
              <div className="relative w-[12px] bg-green-100">
                {[...new Array(formData.nodes.length)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      left: "50%",
                      placeContent: "center",
                      top: `${(2 * i + 1) * (100 / (formData.nodes.length * 2))}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`absolute size-[45px] rounded-full bg-green-300 font-bold text-white`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex-1 space-y-8">
                {/*後で型作ります*/}
                {formData.nodes.map((node, index) => (
                  <PreviewCard key={index} node={node} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
