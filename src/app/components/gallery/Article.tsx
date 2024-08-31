import PostInfo from "@/app/components/gallery/ArticleInfo";
import ArticleThumbnail from "@/app/components/gallery/ArticleThumbnail";
import { GalleryArticle } from "@/types/gallery-articles";

export default function Article({ article }: { article: GalleryArticle }) {
  function truncateTitle(title: string, length: number) {
    return title.length > length ? `${title.slice(0, length)}...` : title;
  }

  const truncatedTitle = truncateTitle(article.title, 20);

  return (
    <article className="rounded-xl bg-white px-10 pb-8 pt-6 shadow-sm">
      {/* 投稿情報 */}
      <PostInfo article={article} />

      {/* 記事タイトル */}
      <h2 className="my-2 mb-[15px] h-[50px] text-xl font-bold">{truncatedTitle}</h2>

      {/* 記事サムネ */}
      <ArticleThumbnail article={article} />
    </article>
  );
}
