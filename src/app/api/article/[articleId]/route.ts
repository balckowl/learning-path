import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
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

export const DELETE = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("認証してくださいね!");

  const { id: authorId } = session.user;
  const id = Number(params.articleId);
  if (!id) throw Error("無効なURLです");
  const article = await prisma.article.findUnique({
    where: {
      id: id,
    },
  });
  console.log(article);
  if (article?.authorId != authorId) throw Error("他のユーザの記事を消そうとしています!");

  const { count } = await prisma.node.deleteMany({
    where: {
      articleId: id,
    },
  });

  const deleteArticle = await prisma.article.delete({
    where: {
      id: id,
    },
  });

  const returnObj = {
    deletedArticle: deleteArticle,
    deletedNodesCount: count,
  };

  return NextResponse.json({ returnObj }, { status: 200 });
};

export const PUT = async (req: NextRequest, { params }: { params: { articleId: string } }) => {
  type UpdateArticleRequiredJson = {
    title: string;
    articleId: number;
    categoryId: string;
    nodes: Array<{
      id: number;
      comment: string;
      nodeTitle: string;
      nodeUrl: string;
      order: number;
    }>;
  };
  const { title, articleId, categoryId, nodes }: UpdateArticleRequiredJson = await req.json();
  console.log(title, categoryId, nodes);
  const session = await getServerSession(authOptions);
  if (!session) throw Error("認証してくださいね!");

  const { id: authorId } = session.user;
  const id = Number(params.articleId);
  if (!id) throw Error("無効なURLです");
  const article = await prisma.article.findUnique({
    where: {
      id: id,
    },
  });
  console.log(article);
  if (article?.authorId != authorId) throw Error("他のユーザの記事を編集しようととしています!");

  const updatedArticle = prisma.article.update({
    data: { title: title, categoryId: categoryId },
    where: { id: articleId },
  });

  if (!updatedArticle) throw Error("記事をアップデートできません!");

  // Node table を update
  const nodeUpdateQuery = nodes.map((node) => {
    const data = {
      comment: node.comment,
      nodeTitle: node.nodeTitle,
      nodeUrl: node.nodeUrl,
      order: node.order,
    };
    return prisma.node.update({
      data: data,
      where: { id: id },
    });
  });

  const node = await prisma.$transaction(nodeUpdateQuery);

  return NextResponse.json({ node, updatedArticle }, { status: 200 });
};
