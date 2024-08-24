import PostInfo from "@/app/components/gallery/ArticleInfo";

import ArticleThumbnail from "./ArticleThumbnail";

export type ArticleType = {
  id: number;
  title: string;
  date: string;
  thumbnail: {
    articleImg: string;
    articleTitle: string;
  }[];
  userImg: string;
  username: string;
};

export default function Article({ article }: { article: ArticleType }) {
  return (
    <article className="rounded-xl bg-white px-10 pb-8 pt-4 drop-shadow-lg">
      {/* 投稿情報 */}
      <PostInfo article={article} />

      {/* 記事タイトル */}
      <h2 className="my-2 text-center text-2xl">{article.title}</h2>

      {/* 記事サムネ */}
      <ArticleThumbnail article={article} />
    </article>
  );
}
