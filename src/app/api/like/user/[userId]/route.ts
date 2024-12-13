import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required", success: false }, { status: 400 });
  }

  const page = new URL(req.url).searchParams.get("page") || "1";
  const pageNumber = parseInt(page, 10);
  const limit = 9;

  // ユーザーがいいねした記事のIDを取得
  const likedArticles = await prisma.like.findMany({
    select: { articleId: true },
    where: { userId: userId },
  });

  const articleIds = likedArticles.map((like) => like.articleId);

  if (articleIds.length === 0) {
    return NextResponse.json({ articles: [], totalArticles: 0 });
  }

  const totalArticles = articleIds.length;

  // いいねした記事の情報を取得
  const articles = await prisma.article.findMany({
    include: {
      author: true,
      category: true,
      nodes: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (pageNumber - 1) * limit,
    take: limit,
    where: {
      id: {
        in: articleIds,
      },
    },
  });

  // 各記事のノードのOGP情報を取得し、データ構造を整える
  const updatedArticles = await Promise.all(
    articles.map(async (article) => {
      const updatedNodes = await Promise.all(
        article.nodes.map(async (node) => {
          const ogp = await getOgpInfo(node.nodeUrl);
          return {
            ...node,
            ogp,
          };
        }),
      );

      // タグ情報を整形
      const tags = article.tags.map((tagRelation) => tagRelation.tag);

      return {
        ...article,
        nodes: updatedNodes,
        tags, // タグ情報を含める
      };
    }),
  );

  return NextResponse.json({ articles: updatedArticles, totalArticles });
};
