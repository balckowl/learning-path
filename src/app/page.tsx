import Article, { ArticleType } from "@/app/components/gallery/Article";

export default function Home() {
  const articles: ArticleType[] = [
    {
      id: 1,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      userImg: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 2,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      userImg: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 3,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      userImg: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 4,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      userImg: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 5,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          articleImg: "/gallery-page/article-thumbnail-sample.png",
          articleTitle: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      userImg: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
  ];

  return (
    <div className="container">
      <div className="my-4">
        <div className="grid grid-cols-2 gap-4">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
