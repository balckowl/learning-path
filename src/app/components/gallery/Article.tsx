import PostInfo from "@/app/components/gallery/ArticleInfo";
import ArticleThumbnail from "@/app/components/gallery/ArticleThumbnail";
import { GalleryArticle } from "@/types/gallery-articles";

export default function Article({ article }: { article: GalleryArticle }) {
  return (
    <article className="rounded-xl bg-white px-10 pb-8 pt-6 drop-shadow-lg">
      {/* 投稿情報 */}
      <PostInfo article={article} />

      {/* 記事タイトル */}
      <h2 className="my-2 text-xl font-bold">{article.title}</h2>

      {/* 記事サムネ */}
      <ArticleThumbnail article={article} />
    </article>
  );
}
