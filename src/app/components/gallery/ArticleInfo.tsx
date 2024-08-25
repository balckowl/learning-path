import { format } from "date-fns";
import { Timer } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default function ArticleInfo({ article }: { article: GalleryArticle }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-9 border">
          <AvatarImage src={article.author.image} alt="ユーザー画像" className="size-9" />
          <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-[15px]">{article.author.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <Timer size={18} />
        <time className="text-[15px]">{format(article.createdAt, "yyyy/MM/dd")}</time>
      </div>
    </div>
  );
}
