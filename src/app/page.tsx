import Link from "next/link";

import Article from "@/app/components/gallery/Article";
import { GalleryArticle } from "@/types/gallery-articles";

import Pagination from "./components/shared/pagination";

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const page = searchParams.page || "1";
  const res = await fetch(`http:/localhost:3000/api/articles?page=${page}`, {
    cache: "no-store",
  });

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await res.json();
  const { articles, totalArticles } = articlesBytotalArticles;
  const limit = 9;
  const currentPage = parseInt(page, 10);

  return (
    <div className="min-h-[calc(100vh-60px-50px)] bg-yellow-300">
      <div className="container px-[10px] py-[20px]">
        <div className="mb-[20px] grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/article/${article.id}`} key={article.id}>
              <Article article={article} />
            </Link>
          ))}
        </div>
        {/*pagination*/}
        <Pagination limit={limit} currentPage={currentPage} totalCount={totalArticles} />
      </div>
    </div>
  );
}
