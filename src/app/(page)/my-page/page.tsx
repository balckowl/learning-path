import Link from "next/link";
import { getServerSession } from "next-auth/next";

import DeleteButton from "@/app/components/myPage/delete-button";
import Blockpage from "@/app/components/new/blockpage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import { GalleryArticle } from "@/types/gallery-articles";
import { UsersAllArticles } from "@/types/user-articles";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <Blockpage />;

  const res = await fetch(`${process.env.BASE_URL}/api/articles/user/${session.user.id}`, {
    cache: "no-store",
  });

  const likedArticlesRes = await fetch(`${process.env.BASE_URL}/api/like/user/${session.user.id}`, {
    cache: "no-store",
  });

  const data: UsersAllArticles = await res.json();
  const likedArticles: { articles: GalleryArticle[] } = await likedArticlesRes.json();
  const { articles } = data;

  console.log(likedArticles);

  return (
    <div className="min-h-[calc(100vh-60px-50px)] bg-green-200">
      <div className="flex justify-center">
        <div className="w-[95%] px-[10px] py-[100px] lg:w-[70%]">
          <div>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">自分の記事</TabsTrigger>
                <TabsTrigger value="password">いいねした記事</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                {articles.map((article) => (
                  <div key={article.id} className="flex gap-6">
                    <Link
                      href={`/article/${article.id}`}
                      key={article.id}
                      className="container relative mb-2 flex w-full items-center justify-between rounded bg-white py-7"
                    >
                      <p className="absolute left-0 top-0 bg-green-300 px-3 py-1">{article.categoryName}</p>
                      <p className="mt-[15px] text-xl font-bold">{article.title}</p>
                    </Link>
                    <DeleteButton articleId={article.id} />
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="password">
                {likedArticles.articles.map((article) => (
                  <div key={article.id} className="flex gap-6">
                    <Link
                      href={`/article/${article.id}`}
                      key={article.id}
                      className="container relative mb-2 flex w-full items-center justify-between rounded bg-white py-7"
                    >
                      <p className="absolute left-0 top-0 bg-green-300 px-3 py-1">{article.category.name}</p>
                      <p className="mt-[15px] text-xl font-bold">{article.title}</p>
                    </Link>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
            {/* <h2 className="mb-[50px] text-center text-[35px] font-bold">自分の記事</h2>
            <div className="container px-[10px] py-[20px]">
              <div className="container mb-[20px]">
                {articles.map((article) => (
                  <div key={article.id} className="flex gap-6">
                    <Link
                      href={`/article/${article.id}`}
                      key={article.id}
                      className="container relative mb-2 flex w-full items-center justify-between rounded bg-white py-7"
                    >
                      <p className="absolute left-0 top-0 bg-yellow-300 px-3 py-1">{article.categoryName}</p>
                      <p className="mt-[15px] text-xl font-bold">{article.title}</p>
                    </Link>
                    <DeleteButton articleId={article.id} />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
