"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  articleId: string;
  userId: string;
};

export default function LikeButton({ articleId, userId }: Props) {
  const [isLike, setIsLike] = useState(false);

  const toggleLike = () => {
    setIsLike(!isLike);
  };

  const submitLike = async () => {
    await fetch("/api/like", {
      body: JSON.stringify({
        articleId: parseInt(articleId, 10), // 数値に変換
        userId,
      }),
      headers: {
        "Content-Type": "application/json", // ヘッダーを追加
      },
      method: "POST",
    });

    toggleLike();
  };

  return (
    <Button onClick={submitLike} variant="ghost">
      <Bookmark size={30} fill={isLike ? "balck" : "white"} />
    </Button>
  );
}
