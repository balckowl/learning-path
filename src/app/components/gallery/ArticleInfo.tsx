import { ArticleType } from "@/app/components/gallery/Article";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ArticleInfo({ article }: { article: ArticleType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="size-9 border">
          <AvatarImage src={article.userImg} alt="ユーザー画像" className="size-9" />
          <AvatarFallback>{article.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-[15px]">{article.username}</p>
      </div>
      <div>
        <time className="text-[15px]">{article.date}</time>
      </div>
    </div>
  );
}
