import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
  const { articleId } = params;

  // セッションを取得
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  console.log(session);

  // 記事をデータベースから取得
  const article = await prisma.article.findUnique({
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
    where: { id: Number(articleId) },
  });

  if (!article) return NextResponse.json({}, { status: 404 });

  // ノードのOGP情報を追加
  const updatedNodes = await Promise.all(
    article.nodes.map(async (node) => {
      const ogp = await getOgpInfo(node.nodeUrl);
      return {
        ...node,
        ogp, // OGPの画像URLを追加
      };
    }),
  );

  // タグ情報を整形
  const tags = article.tags.map((tagRelation) => tagRelation.tag);

  // いいねの情報をチェック
  let hasLiked = false;
  if (userId) {
    const like = await prisma.like.findFirst({
      where: {
        articleId: Number(articleId),
        userId: userId,
      },
    });
    hasLiked = !!like; // いいねしていればtrue、していなければfalse
  }

  const updatedArticle = {
    ...article,
    hasLiked, // ユーザーがいいねしているかどうか
    nodes: updatedNodes,
    tags,
  };

  return NextResponse.json(updatedArticle, { status: 200 });
};

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
