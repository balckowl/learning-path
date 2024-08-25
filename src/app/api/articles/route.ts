import { NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async () => {
  const articles = await prisma.article.findMany({
    include: {
      nodes: true,
    },
  });

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

      return {
        ...article,
        nodes: updatedNodes,
      };
    }),
  );

  return NextResponse.json(updatedArticles);
};
