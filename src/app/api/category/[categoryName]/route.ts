import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { categoryName: string } }) => {
  const { categoryName } = params;
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
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

  // VSCode の型表示をわかりやすくしてくれるヤツ
  // see: https://tech.mobilefactory.jp/entry/2021/12/02/000000
  //      https://qiita.com/uhyo/items/f5e4483b8e3005f3f5fc
  type Flatten<T> = {
    [K in keyof T]: T[K];
  };

  const returnedObj: Flatten<AllArticlesInCategoryObj> = await Promise.all(
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
