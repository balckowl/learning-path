import Link from "next/link";

import Article from "@/app/components/gallery/Article";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Home() {
  const res = await fetch("http:/localhost:3000/api/articles", { cache: "no-store" });

  const articleData: GalleryArticle[] = await res.json();

  return (
    <div className="min-h-[calc(100vh-60px-50px)] bg-yellow-300">
      <div className="container px-[10px] py-[20px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articleData.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id}>
              <Article article={article} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
