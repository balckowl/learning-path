import { Tag } from "@prisma/client";
import { Node } from "./gallery-articles";

export type GalleryArticleWithHasLiked = {
  id: number;
  title: string;
  author: {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
  };
  authorId: string;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  nodes: Node[];
  updatedAt: string;
  tags: Tag[];
  hasLiked: boolean;
};
