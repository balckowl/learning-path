import { AvatarFallback } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { Timer } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default function Article({ article }: { article: GalleryArticle }) {
  function truncateTitle(title: string, length: number) {
    return title.length > length ? `${title.slice(0, length)}...` : title;
  }

  const truncatedTitle = truncateTitle(article.title, 20);

  return (
    <article className="relative rounded-xl border-2 border-black bg-white px-4 py-3 shadow-sm duration-300 hover:bg-slate-100">
      {/* タイトルとカテゴリ */}
      <div className="h-[150px]">
        <h2 className="mb-[5px] text-2xl font-bold">{truncatedTitle}</h2>
        <p className="inline-block rounded-xl bg-green-200 px-2 py-1 text-xs">{article.category.name}</p>
      </div>

      {/* 投稿情報 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="">
            <AvatarImage src={article.author.image} alt={article.author.name} />
            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
          </Avatar>
          <p>{article.author.name}</p>
        </div>
        <div className="flex items-center">
          <Timer size={13} />
          <time className="">{format(article.createdAt, "yyyy/MM/dd")}</time>
        </div>
      </div>
    </article>
  );
}
