import { Node } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export const PUT = async (req: NextRequest) => {
  const { title, articleId, categoryId, nodes, tagIds } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) throw new Error("認証してくださいね!");

  const { id: authorId } = session.user;

  // トランザクションで記事とタグの関連付けを処理
  const updatedArticle = await prisma.$transaction(async (prisma) => {
    // 記事を更新
    const updatedArticle = await prisma.article.update({
      data: {
        title,
        authorId, // オプション: 記事の著者が変更されない場合、この行は不要です
        categoryId,
        nodes: {
          create: nodes.map((node: Node) => ({
            comment: node.comment,
            nodeTitle: node.nodeTitle,
            nodeUrl: node.nodeUrl,
            order: 1, // 必要に応じて order を指定
          })),
          deleteMany: { articleId }, // 古いノードを削除
        },
      },
      where: { id: articleId },
    });

    // タグを中間テーブルで更新
    if (tagIds && tagIds.length > 0) {
      // 既存のタグを削除し、新しいタグを追加
      await prisma.articleTag.deleteMany({
        where: { articleId },
      });

      // 新しいタグを中間テーブルに追加
      await prisma.articleTag.createMany({
        data: tagIds.map((tagId: string) => ({
          articleId: updatedArticle.id,
          tagId,
        })),
      });
    }

    return updatedArticle;
  });

  return NextResponse.json({ article: updatedArticle });
};
