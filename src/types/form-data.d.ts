import { Tag } from "@prisma/client";

export type FormData = {
  title: string;
  categoryId: string;
  nodes: FormDataNode[];
  tags: Tag[];
};

export type FormDataNode = {
  comment?: string;
  nodeTitle: string;
  nodeUrl: string;
};
