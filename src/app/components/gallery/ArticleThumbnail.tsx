import Image from "next/image";

import { ArticleType } from "@/app/components/gallery/Article";

export default function ArticleThumbnail({ article }: { article: ArticleType }) {
  return (
    <div className="relative">
      <div className="relative space-y-8">
        {article.thumbnail.map((thumbnail) => (
          <div key={thumbnail.articleTitle} className="relative">
            <div className="rounded bg-[#FFDD81] p-2">
              <Image className="w-full" src={thumbnail.articleImg} width={153} height={78} alt="記事サムネイル" />
            </div>
            <div className="absolute left-1/2 top-full h-8 w-1.5 -translate-x-1/2 bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
