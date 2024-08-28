import { Node } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export const POST = async (req: NextRequest) => {
  const { title, nodes } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) throw Error("認証してくださいね!");

  const { id: authorId } = session.user;

  const article = await prisma.article.create({
    data: {
      title,
      authorId,
      nodes: {
        create: nodes.map((node: Node) => ({
          comment: node.comment,
          nodeTitle: node.nodeTitle,
          nodeUrl: node.nodeUrl,
          order: 1,
        })),
      },
    },
  });

  return NextResponse.json({ article }, { status: 201 });
};
