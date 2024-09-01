import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";

import DeleteButton from "@/app/components/myPage/delete-button";
import Blockpage from "@/app/components/new/blockpage";
import { authOptions } from "@/lib/auth";
import { UsersAllArticles } from "@/types/user-articles";

async function fetchArticles(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/articles/user/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <Blockpage />;

  const userId = session.user.id;

  try {
    const data: UsersAllArticles = await fetchArticles(userId);
    const articles = data.articles;

    return (
      <div className="min-h-[calc(100vh-60px-50px)] bg-yellow-300">
        <div className="container">
          <h1 className="pt-4 text-4xl">自分の記事</h1>
          <div className="container px-[10px] py-[20px]">
            <div className="container mb-[20px]">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="container mb-2 flex w-full items-center justify-between rounded bg-white py-4"
                >
                  <p className="text-2xl">{article.title}</p>
                  <div className="flex gap-2">
                    <DeleteButton articleId={article.id} />
                    {/* <Pencil /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return notFound(); // API呼び出しが失敗した場合、404ページを表示
  }
}
