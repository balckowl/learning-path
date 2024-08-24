import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import Card from "@/app/components/layout/article/card";

export default function Page() {
  const cardsData = [
    {
      id: 1,
      title: "1. Next.jsの環境構築",
      content: "まず、このページでNext.jsの環境構築とコンポーネントの知識をつけることができます。",
      description: "これは、node-article-title1です。これは、node-article-title1です。",
      imageAlt: "Article Thumbnail",
      imageSrc: "/image/ogp.png",
    },
    {
      id: 2,
      title: "2. TailwindCSSの学習",
      content: "次にこの記事でTailwindCSSの使い方を学ぶことができます。",
      description: "これは、node-article-title2です。これは、node-article-title2です。",
      imageAlt: "Article Thumbnail",
      imageSrc: "/image/ogp.png",
    },
    {
      id: 3,
      title: "3. Vercalへのデプロイ",
      content: "最後にこの記事でデプロイの方法について学ぶことができます。",
      description: "これは、node-article-title3です。これは、node-article-title3です。",
      imageAlt: "Article Thumbnail",
      imageSrc: "/image/ogp.png",
    },
  ];
  return (
    <div className="container flex min-h-screen flex-col items-center bg-gray-100 py-6">
      <h1 className="mb-3 text-3xl font-bold">Next.jsで簡単なWebアプリが作れるようになる</h1>
      <p className="mb-4 text-gray-600">2024/08/24</p>
      <div className="mb-6 flex w-full max-w-4xl justify-between">
        <div className="flex gap-1">
          <p className="size-fit rounded-full bg-slate-400 p-1 px-3">Next.js</p>
          <p className="size-fit rounded-full bg-slate-400 p-1 px-3">React</p>
        </div>
        <div className="flex items-center">
          <Avatar className="mx-auto size-12">
            <AvatarImage src="image/icon.png" className="size-12" />
            <AvatarFallback>そらち</AvatarFallback>
          </Avatar>
          <h2 className="ml-2 text-lg font-semibold">Sorachi Nishibori</h2>
        </div>
      </div>
      <div className="relative flex flex-col items-center">
        {/* Vertical line connecting the cards */}
        <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-gray-500"></div>
        <div className="z-10 space-y-8">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              description={card.description}
              content={card.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
