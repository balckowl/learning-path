import { Node } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export const POST = async (req: NextRequest) => {
  const { title, categoryId, nodes, tagIds } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) throw new Error("認証してくださいね!");

  const { id: authorId } = session.user;

  // トランザクションで記事とタグの関連付けを処理
  const article = await prisma.$transaction(async (prisma) => {
    // 記事を作成
    const createdArticle = await prisma.article.create({
      data: {
        title,
        authorId,
        categoryId,
        nodes: {
          create: nodes.map((node: Node) => ({
            comment: node.comment,
            nodeTitle: node.nodeTitle,
            nodeUrl: node.nodeUrl,
            order: 1, // 必要に応じて order を指定
          })),
        },
      },
    });

    // タグを中間テーブルに追加
    if (tagIds && tagIds.length > 0) {
      await prisma.articleTag.createMany({
        data: tagIds.map((tagId: string) => ({
          articleId: createdArticle.id,
          tagId,
        })),
      });
    }

    return createdArticle;
  });

  return NextResponse.json({ article }, { status: 201 });
};
