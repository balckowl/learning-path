import ArticleSection from "@/app/components/shared/article-section";
import CategorySection from "@/app/components/shared/category-section";
import Pagination from "@/app/components/shared/pagination";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page({ searchParams }: { searchParams: { page: string } }) {
  const page = searchParams.page ? searchParams.page : "1";

  const res = await fetch(`${process.env.BASE_URL}/api/articles?page=${page}`, {
    cache: "no-store",
  });

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await res.json();
  const { articles, totalArticles } = articlesBytotalArticles;
  const limit = 9;

  return (
    <>
      <ArticleSection articles={articles} title="パス一覧">
        <Pagination totalCount={totalArticles} currentPage={Number(page)} limit={limit} />
      </ArticleSection>
      <CategorySection />
    </>
  );
}
