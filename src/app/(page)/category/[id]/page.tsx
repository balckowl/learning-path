import ArticleSection from "@/app/components/shared/article-section";
import CategorySection from "@/app/components/shared/category-section";
import Pagination from "@/app/components/shared/pagination";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const { id } = params;
  const page = searchParams.page ? searchParams.page : "1";

  const res = await fetch(`${process.env.BASE_URL}/api/category/${id}?page=${page}`, {
    cache: "no-store",
  });

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await res.json();
  const { articles, totalArticles } = articlesBytotalArticles;
  const limit = 9;

  return (
    <div>
      {articles.length > 0 ? (
        <ArticleSection articles={articles} title={articles[0].category.name}>
          {/*api側の対応待ち*/}
          <Pagination totalCount={totalArticles} limit={limit} currentPage={Number(page)} />
        </ArticleSection>
      ) : (
        <div className="min-h-[calc(100vh-60px-50px)]">
          <div className="flex justify-center py-[70px]">
            <div className="w-[95%] lg:w-[70%]">空っぽ</div>
          </div>
        </div>
      )}
      <CategorySection />
    </div>
  );
}
