export type FormData = {
    title: string;
    categoryId: string;
    nodes: FormDataNode[];
}

export type FormDataNode = {
    comment?: string;
    nodeTitle: string;
    nodeUrl: string;
}