import { format } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default function ArticleInfo({ article }: { article: GalleryArticle }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-9 border">
          <AvatarImage src="" alt="ユーザー画像" className="size-9" />
          {/* <AvatarFallback>{article.username.charAt(0)}</AvatarFallback> */}
        </Avatar>
        <p className="text-[15px]">テストユーザ</p>
      </div>
      <div>
        <time className="text-[15px]">{format(article.createdAt, "yyyy/MM/dd")}</time>
      </div>
    </div>
  );
}
