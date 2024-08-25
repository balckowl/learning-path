import Image from "next/image";

import { ArticleType } from "@/app/components/gallery/Article";

export default function ArticleThumbnail({ article }: { article: ArticleType }) {
  return (
    <div className="relative">
      <div className="relative space-y-8">
        {article.thumbnail.map((thumbnail) => (
          <div key={thumbnail.articleTitle} className="relative">
            <div className="flex flex-col items-center rounded bg-[#FFDD81] p-2 lg:flex-row">
              <Image
                className="inline-block pb-2 lg:pb-0"
                src={thumbnail.articleImg}
                width={153}
                height={78}
                alt="記事サムネイル"
              />
              <p className="mx-2 bg-gray-700 p-1 text-blue-500">{thumbnail.articleTitle}</p>
            </div>
            <div className="absolute left-1/2 top-full h-8 w-1.5 -translate-x-1/2 bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
