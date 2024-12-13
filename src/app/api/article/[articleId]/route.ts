import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth"; // 認証設定
import prisma from "@/lib/prisma/client"; // prisma のインスタンスをインポート

export const DELETE = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("認証してくださいね!");

  const { id: authorId } = session.user;
  const id = Number(params.articleId);
  if (!id) throw new Error("無効なURLです");

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) throw new Error("指定された記事が見つかりません!");
  if (article.authorId !== authorId) throw new Error("他のユーザの記事を消そうとしています!");

  // トランザクションで削除処理を実行
  const result = await prisma.$transaction(async (prisma) => {
    // Like の削除
    await prisma.like.deleteMany({
      where: { articleId: id },
    });

    // ノードの削除
    const deletedNodesCount = await prisma.node.deleteMany({
      where: { articleId: id },
    });

    // ArticleTags の削除
    await prisma.articleTag.deleteMany({
      where: { articleId: id },
    });

    // 記事の削除
    const deletedArticle = await prisma.article.delete({
      where: { id },
    });

    return { deletedArticle, deletedNodesCount };
  });

  return NextResponse.json({ result }, { status: 200 });
};
