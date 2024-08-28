/*
  Warnings:

  - Added the required column `categoryId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "Article" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- 初めに新しい Category の値を作る (name: Uncategorized, id: 1(たぶん))
INSERT INTO "Category" (name, createdAt, updatedAt) VALUES ('Uncategorized', NOW(), NOW());

-- デフォルト値を設定し一度カラムを作成
ALTER TABLE "Article" ADD COLUMN  "categoryId" INTEGER DEFAULT 1;

-- DEFAULT 値を削除
ALTER TABLE "Article" ALTER COLUMN "categoryId" DROP DEFAULT;

--  `NOT NULL` 制約をつける
ALTER TABLE "Article" ALTER COLUMN "categoryId" SET NOT NULL;



-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
