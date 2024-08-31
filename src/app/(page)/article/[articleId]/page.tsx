import { format } from "date-fns";
import { Timer } from "lucide-react";
import { notFound } from "next/navigation";

import Card from "@/app/components/layout/article/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page({ params }: { params: { articleId: string } }) {
  const { articleId } = params;

  const res = await fetch(`http://localhost:3000/api/article/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const article: GalleryArticle = await res.json();

  return (
    <div className="bg-yellow-300">
      <div className="flex justify-center px-[10px] py-[20px]">
        <div className="w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <h1 className="mb-3 text-3xl font-bold">{article.title}</h1>
          <time className="flex items-center gap-2 text-gray-600">
            <Timer size={18} />
            {format(article.createdAt, "yyyy/MM/dd")}
          </time>
          <div className="mb-[15px] mt-[10px] flex items-center justify-between">
            <div className="flex gap-2">
              <p className="size-fit rounded-full border-2 p-1 px-3">{article.category.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-10">
                <AvatarImage src={article.author.image} className="size-10" />
                <AvatarFallback>{article.author.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{article.author.name}</h2>
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            {/* Vertical line connecting the cards */}
            <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-gray-500"></div>
            <div className="z-10 w-full space-y-8">
              {/*後で型作ります*/}
              {article.nodes.map((node, index) => (
                <Card key={node.id} node={node} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
