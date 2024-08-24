import Article, { ArticleType } from "./components/gallery/Article";

export default function Home() {
  const articles: ArticleType[] = [
    {
      id: 1,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      user_img: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 2,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      user_img: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 3,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      user_img: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 4,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      user_img: "/gallery-page/user-img-sample.png",
      username: "Somahc",
    },
    {
      id: 5,
      title: "Next.jsで簡単なWebアプリが作れるようになる",
      date: "2024/08/24",
      thumbnail: [
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
        {
          article_img: "/gallery-page/article-thumbnail-sample.png",
          article_title: "Parralel RoutesとIntercepting Routesを使用したモーダル実装 モーダル実装 モーダル実装",
        },
      ],
      user_img: "/gallery-page/user-img-sample.png",
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
