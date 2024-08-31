import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const category = await prisma.category.findUnique({
    where: { id: id },
  });

  if (!category) return NextResponse.json({}, { status: 404 });

  const categoryId = category.id;

  // そのカテゴリに属する記事一覧
  const article = await prisma.article.findMany({
    where: { categoryId: categoryId },
  });

  // Front側へ渡す JSON の Schema
  type AllArticlesInCategoryObj = Array<{
    id: number;
    title: string;
    authorId: string;
    authorImage: string;
    authorName: string;
    createdAt: Date;
    firstOgp: string;
    updatedAt: Date;
  }>;

  const returnedObj: AllArticlesInCategoryObj = await Promise.all(
    article.map(async (val) => {
      const firstNode = await prisma.node.findFirst({
        orderBy: { order: "asc" },
        select: {
          nodeUrl: true,
        },
        where: { articleId: val.id },
      });

      const ogpUrl: string = firstNode?.nodeUrl ? await getOgpInfo(firstNode.nodeUrl) : "";

      const authorInfo = await prisma.user.findUnique({
        select: {
          name: true,
          image: true,
        },
        where: { id: val.authorId },
      });

      return {
        ...val,
        authorImage: authorInfo?.image ? authorInfo.image : "",
        authorName: authorInfo?.name ? authorInfo.name : "",
        firstOgp: ogpUrl,
      };
    }),
  );

  return NextResponse.json(returnedObj, { status: 200 });
};
