import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma/client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ error: "articleId is required", success: false }, { status: 400 });
  }

  try {
    // 記事IDに基づいていいねの数を取得
    const likeCount = await prisma.like.count({
      where: {
        articleId: parseInt(articleId),
      },
    });

    return NextResponse.json({ likeCount });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    );
  }
};
