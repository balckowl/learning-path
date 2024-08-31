export type UsersAllArticles = {
  articles:
    | Array<{
        id: number;
        title: string;
        categoryId: string;
        categoryImage: string;
        categoryName: string;
        createdAt: Date;
        firstComment: string;
        firstOgp: string;
        firstTitle: string;
        updatedAt: Date;
      }>
    | [];
  hasArticle: boolean;
  userExists: boolean;
};
