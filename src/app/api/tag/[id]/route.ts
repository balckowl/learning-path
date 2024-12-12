import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  // ページネーション
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page, 10);
  const limit = 9;

  // 指定されたタグを取得
  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  if (!tag) return NextResponse.json({}, { status: 404 });

  // そのタグに属する記事一覧を ArticleTag から取得
  const articles = await prisma.articleTag.findMany({
    include: {
      article: {
        include: {
          author: true,
          category: true,
          nodes: true,
          tags: true,
        },
      },
      tag: true,
    },
    orderBy: {
      article: {
        createdAt: "desc",
      },
    },
    skip: (pageNumber - 1) * limit,
    take: limit,
    where: { tagId: id },
  });

  // 記事データの整形
  const updatedArticles = await Promise.all(
    articles.map(async ({ article }) => {
      const updatedNodes = await Promise.all(
        article.nodes.map(async (node) => {
          const ogp = await getOgpInfo(node.nodeUrl);
          return {
            ...node,
            ogp,
          };
        }),
      );

      const authorInfo = {
        authorImage: article.author?.image || "",
        authorName: article.author?.name || "",
      };

      return {
        ...article,
        nodes: updatedNodes,
        ...authorInfo,
        tag,
      };
    }),
  );

  return NextResponse.json({ articles: updatedArticles, totalArticles: updatedArticles.length });
};
