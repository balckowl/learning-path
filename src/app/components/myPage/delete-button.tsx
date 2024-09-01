// components/TrashButton.tsx
"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import DeleteArert from "./delete-alert";

type TrashButtonProps = {
  articleId: number;
};

const DeleteButton: React.FC<TrashButtonProps> = ({ articleId }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの状態を管理

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/article/${articleId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete article");
      }

      // 成功した場合はページをリロードしてリフレッシュ
      router.refresh();
    } catch (error) {
      console.error("Error deleting article:", error);
    } finally {
      setIsModalOpen(false); // モーダルを閉じる
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="text-red-600 hover:text-red-800">
        <Trash2 />
      </button>
      <DeleteArert
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="この記事を削除しますか？"
      />
    </>
  );
};

export default DeleteButton;
