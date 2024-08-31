import ArticleSection from "@/app/components/shared/article-section";
import CategorySection from "@/app/components/shared/category-section";
import Pagination from "@/app/components/shared/pagination";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3000/api/category/${id}`, {
    cache: "no-store",
  });

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await res.json();
  const { articles } = articlesBytotalArticles;
  const limit = 9;

  return (
    <div>
      {articles.length > 0 ? (
        <ArticleSection articles={articles} title={articles[0].category.name}>
          {/*api側の対応待ち*/}
          <Pagination totalCount={100} limit={limit} currentPage={1} />
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
