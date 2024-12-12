import { format } from "date-fns";
import { TagIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Card from "@/app/components/layout/article/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page({ params }: { params: { articleId: string } }) {
  const { articleId } = params;

  const res = await fetch(`${process.env.BASE_URL}/api/article/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const article: GalleryArticle = await res.json();

  const formattedCreatedAt = format(article.createdAt, "yyyy/MM/dd");
  const formattedUpdatedAt = format(article.updatedAt, "yyyy/MM/dd");

  return (
    <div className="bg-yellow-200">
      <div className="flex justify-center px-[10px] py-[100px]">
        <div className="relative w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:p-[70px]">
          <div className="absolute left-0 top-0 flex items-center gap-5">
            <p className="bg-yellow-300 px-3 py-1">{article.category.name}</p>
          </div>
          <h1 className="mb-1 text-3xl font-bold">{article.title}</h1>
          <div className="flex cursor-pointer items-center gap-3 text-[14px]">
            {article.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.id}`}
                className="flex items-center gap-1 rounded-sm bg-gray-200 px-2 py-[2px] hover:bg-gray-300"
              >
                <TagIcon size={15} />
                {tag.name}
              </Link>
            ))}
          </div>
          <div className="mb-[15px] flex justify-between">
            <div className="flex gap-3">
              <time className="flex items-center gap-2 text-gray-600">
                投稿日:
                {formattedCreatedAt}
              </time>
              <time className="flex items-center gap-2 text-gray-600">
                最終投稿日:
                {formattedUpdatedAt}
              </time>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-9 border">
                <AvatarImage src={article.author.image} className="size-9" />
                <AvatarFallback>{article.author.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{article.author.name}</h2>
            </div>
          </div>
          <div>
            {/* Vertical line connecting the cards */}
            {/* <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-gray-500"></div> */}
            <div className="flex h-full gap-10">
              <div className="relative w-[12px] bg-yellow-100">
                {[...new Array(article.nodes.length)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      left: "50%",
                      placeContent: "center",
                      top: `${(2 * i + 1) * (100 / (article.nodes.length * 2))}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`absolute size-[45px] rounded-full bg-yellow-300 font-bold text-white`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex-1 space-y-8">
                {/*後で型作ります*/}
                {article.nodes.map((node, index) => (
                  <Card key={node.id} node={node} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
