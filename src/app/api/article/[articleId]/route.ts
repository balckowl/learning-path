import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
  const { articleId } = params;

  const article = await prisma.article.findUnique({
    include: { author: true, category: true, nodes: true },
    where: { id: Number(articleId) },
  });

  if (!article) return NextResponse.json({}, { status: 404 });

  const updatedNodes = await Promise.all(
    article.nodes.map(async (node) => {
      const ogp = await getOgpInfo(node.nodeUrl);
      return {
        ...node,
        ogp, // OGPの画像URLを追加
      };
    }),
  );

  const updatedArticle = {
    ...article,
    nodes: updatedNodes,
  };

  return NextResponse.json(updatedArticle, { status: 200 });
};
