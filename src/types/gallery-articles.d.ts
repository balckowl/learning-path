import { Tag } from "@prisma/client";

export type GalleryArticle = {
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
};

export type Node = {
  id: number;
  articleId: number;
  comment: string;
  createdAt: string;
  nodeTitle: string;
  nodeUrl: string;
  ogp: {
    "og:image": string;
    "og:site_name": string;
    "og:title": string;
    "og:type": string;
    "og:url": string;
  };
  order: number;
  updatedAt: string;
};
