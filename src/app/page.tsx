import { GalleryArticle } from "@/types/gallery-articles";

import ArticleSection from "./components/shared/article-section";
import CategorySection from "./components/shared/category-section";
import MoreBtn from "./components/top/more-btn";
import RecommendLogin from "./components/top/recommend-login";

export default async function Home() {
  //並列に処理
  const [articlesResponse, categoriesResponse] = await Promise.all([
    fetch(`http://localhost:3000/api/articles?page=1`, {
      cache: "no-store",
    }),
    fetch(`http://localhost:3000/api/categories`, {
      cache: "no-store",
    }),
  ]);

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await articlesResponse.json();
  const categories = await categoriesResponse.json();
  const { articles } = articlesBytotalArticles;

  return (
    <>
      <ArticleSection title="新着パス一覧" articles={articles}>
        <MoreBtn />
      </ArticleSection>
      <CategorySection categories={categories} />
      <RecommendLogin />
    </>
  );
}
