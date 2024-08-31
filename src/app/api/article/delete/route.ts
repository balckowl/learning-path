import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) throw Error("認証してくださいね!");

  const { id: authorId } = session.user;

  const article = await prisma.article.findUnique({
    where: {
      id: id,
    },
  });

  if (article?.authorId != authorId) throw Error("他のユーザの記事を消そうとしています!");

  const deleteArticle = await prisma.article.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ deleteArticle }, { status: 201 });
};
