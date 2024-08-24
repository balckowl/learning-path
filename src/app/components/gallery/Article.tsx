import Image from "next/image";
import React from "react";

export type ArticleType = {
  id: number;
  title: string;
  date: string;
  thumbnail: {
    article_img: string;
    article_title: string;
  }[];
  user_img: string;
  username: string;
};

export default function Article({ article }: { article: ArticleType }) {
  return (
    <article className="rounded-xl bg-white px-10 pb-8 pt-4 drop-shadow-lg">
      {/* 投稿情報 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="inline-block rounded-full"
            src={article.user_img}
            width={45}
            height={45}
            alt="ユーザー画像"
          />
          <p className="text-xl">{article.username}</p>
        </div>
        <div>
          <time className="text-xl">{article.date}</time>
        </div>
      </div>

      {/* 記事タイトル */}
      <h2 className="my-2 text-center text-2xl">{article.title}</h2>

      {/* 記事サムネ */}
      <div className="relative">
        <div className="relative space-y-8">
          {article.thumbnail.map((thumbnail) => (
            <article key={thumbnail.article_title} className="relative">
              <div className="flex items-center rounded bg-[#FFDD81] p-2">
                <Image
                  className="inline-block"
                  src={thumbnail.article_img}
                  width={153}
                  height={78}
                  alt="記事サムネイル"
                />
                <p className="mx-2 bg-gray-700 p-1 text-blue-500">{thumbnail.article_title}</p>
              </div>
              <div className="absolute left-1/2 top-full h-8 w-1.5 -translate-x-1/2 bg-gray-300"></div>
            </article>
          ))}
        </div>
      </div>
    </article>
  );
}
