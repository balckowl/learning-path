import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Article from "@/app/components/gallery/Article";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Home() {
  const res = await fetch(`http:/localhost:3000/api/articles?page=1`, {
    cache: "no-store",
  });

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await res.json();
  const { articles } = articlesBytotalArticles;

  return (
    <div>
      <div className="bg-yellow-200">
        <div className="flex justify-center">
          <div className="w-[95%] px-[10px] pb-[50px] pt-[100px] lg:w-[85%]">
            <div>
              <h2 className="mb-[20px] text-[30px] font-bold">新着投稿</h2>
              <div className="mb-[50px] grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <Link href={`/article/${article.id}`} key={article.id}>
                    <Article article={article} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center">
                <Link href="/" className="flex items-center gap-3 text-yellow-500">
                  記事一覧へ
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
