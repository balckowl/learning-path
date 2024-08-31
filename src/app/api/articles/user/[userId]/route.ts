import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  // Front側へ渡す JSON の Schema
  // 自分の記事以外も検索することを考え、ユーザが存在するかどうかも返すようにした。
  type UsersAllArticles = {
    articles:
      | Array<{
          // まあここら辺は back でも `/api/article/[articleId]` をたたけばいい話。全部ほしかったらそこ叩いて。
          id: number;
          title: string;
          // authorId: string;    // ほしかったらコメントアウト解除して
          // authorImage: string;
          // authorName: string;
          categoryId: string;
          categoryImage: string;
          categoryName: string;
          createdAt: Date;
          firstComment: string;
          firstOgp: string;
          firstTitle: string;
          updatedAt: Date;
        }>
      | [];
    hasArticle: boolean; // そのユーザが記事を所持するか。 false なら articles は空配列
    userExists: boolean; // もしユーザが存在しないことをエラーとするならコメントアウト
  };

  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  // const user = true;

  // if (user) throw Error("そのIdのユーザは存在しません!")   // もしユーザが存在しないことをエラーとするならコメントアウトを解除せよ

  const userExists = !!user; // もしユーザが存在しないことをエラーとするならコメントアウトせよ

  const article = await prisma.article.findMany({
    where: {
      authorId: userId,
    },
  });

  const hasArticle = !!article;

  let articles: UsersAllArticles["articles"] = [];

  if (hasArticle) {
    //  UsersAllArticles.articles を作成
    articles = await Promise.all(
      article.map(async (val) => {
        const firstNode = await prisma.node.findFirst({
          // 最初のnodeを取得
          orderBy: { order: "asc" },
          select: {
            comment: true,
            nodeTitle: true,
            nodeUrl: true,
          },
          where: { articleId: val.id },
        });
        const ogpUrl: string = firstNode?.nodeUrl ? await getOgpInfo(firstNode.nodeUrl) : ""; // そこから最初のogp取得

        // const authorInfo = await prisma.user.findUnique({   // ほしかったらコメントアウト解除して(下も)
        //   select: {
        //     name: true,
        //     image: true,
        //   },
        //   where: { id: val.authorId },

        // });

        const category = await prisma.category.findUnique({
          select: { name: true, image: true },
          where: { id: val.categoryId },
        });

        return {
          ...val, // id, authorId, createdAt, updatedAt, title, categoryId
          categoryImage: category?.image ?? "",
          // authorImage: authorInfo?.image ?? "",
          // authorName: authorInfo?.name ?? "",
          categoryName: category?.name ?? "",
          firstComment: firstNode?.comment ?? "",
          firstOgp: ogpUrl,
          firstTitle: firstNode?.nodeTitle ?? "",
        };
      }),
    );
  }

  const returnObj: UsersAllArticles = {
    articles: articles,
    hasArticle: hasArticle,
    userExists: userExists,
  };
  return NextResponse.json(returnObj, { status: 200 });
};
