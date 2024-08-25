import { format } from "date-fns";
import { notFound } from "next/navigation";

import Card from "@/app/components/layout/article/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/article/1", {
    cache: "no-store",
  });

  const article: GalleryArticle = await res.json();

  if (!article) {
    return notFound();
  }

  return (
    <div className="bg-yellow-300">
      <div className="flex justify-center px-[10px] py-[20px]">
        <div className="w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:px-[70px]">
          <h1 className="mb-3 text-3xl font-bold">{article.title}</h1>
          <time className="mb-5 text-gray-600">{format(article.createdAt, "yyyy/MM/dd")}</time>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-1">
              <p className="size-fit rounded-full bg-slate-400 p-1 px-3">Next.js</p>
              <p className="size-fit rounded-full bg-slate-400 p-1 px-3">React</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-10">
                <AvatarImage src="image/icon.png" className="size-10" />
                <AvatarFallback>そらち</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">Sorachi Nishibori</h2>
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            {/* Vertical line connecting the cards */}
            <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-gray-500"></div>
            <div className="z-10 w-full space-y-8">
              {/*後で型作ります*/}
              {article.nodes.map((node) => (
                <Card
                  key={node.id}
                  title={node.nodeTitle}
                  imageSrc={node.ogp["og:image"]}
                  imageAlt={node.nodeTitle}
                  nodeArticleTitle={node.ogp["og:title"]}
                  content={node.comment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
