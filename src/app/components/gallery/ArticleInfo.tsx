import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { ArticleType } from "@/app/components/gallery/Article";

export default function ArticleInfo({ article }: { article: ArticleType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="w-[45px] rounded-full">
          <AvatarImage src={article.userImg} alt="ユーザー画像" />
          <AvatarFallback>{article.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-xl">{article.username}</p>
      </div>
      <div>
        <time className="text-xl">{article.date}</time>
      </div>
    </div>
  );
}
