import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma/client";

//いいねの追加と解除
export async function POST(request: Request) {
  try {
    const { articleId, userId }: { articleId: number; userId: string } = await request.json();

    // トランザクションを使用して処理
    const result = await prisma.$transaction(async (prisma) => {
      // 既にいいねがあるか確認
      const existingLike = await prisma.like.findFirst({
        where: {
          articleId: articleId,
          userId: userId,
        },
      });

      if (existingLike) {
        // いいねが既にある場合は削除
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        return { action: "removed" };
      }

      // いいねがない場合は追加
      await prisma.like.create({
        data: {
          articleId: articleId,
          userId: userId,
        },
      });

      return { action: "added" };
    });

    revalidateTag("likes");
    revalidateTag("likes2");

    return NextResponse.json({ action: result.action, success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    );
  }
}
