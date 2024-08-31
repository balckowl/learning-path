import Link from "next/link";
import { ReactNode } from "react";

import Article from "@/app/components/gallery/Article";
import { GalleryArticle } from "@/types/gallery-articles";

export default function ArticleSection({
  title,
  articles,
  children,
}: {
  title: string;
  articles: GalleryArticle[];
  children: ReactNode;
}) {
  return (
    <div className="bg-yellow-200">
      <div className="flex justify-center">
        <div className="w-[95%] px-[10px] py-[100px] lg:w-[70%]">
          <div>
            <h2 className="mb-[50px] text-center text-[35px] font-bold">{title}</h2>
            <div className="mb-[50px] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <Link href={`/article/${article.id}`} key={article.id}>
                  <Article article={article} />
                </Link>
              ))}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
