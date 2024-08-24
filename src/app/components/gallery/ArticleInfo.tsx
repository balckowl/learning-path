import Image from "next/image";

import { ArticleType } from "@/app/components/gallery/Article";

export default function ArticleInfo({ article }: { article: ArticleType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image className="inline-block rounded-full" src={article.userImg} width={45} height={45} alt="ユーザー画像" />
        <p className="text-xl">{article.username}</p>
      </div>
      <div>
        <time className="text-xl">{article.date}</time>
      </div>
    </div>
  );
}
