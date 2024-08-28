import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Pagination({
  currentPage,
  limit,
  totalCount,
}: {
  currentPage: number;
  limit: number;
  totalCount: number;
}) {
  const totalPages = Math.ceil(totalCount / limit);

  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;

    if (totalPages <= maxPageNumbers) {
      // ページ数が少ない場合はすべて表示
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 現在のページが最初の方の場合
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      }
      // 現在のページが最後の方の場合
      else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      }
      // 現在のページが中央にある場合
      else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {/* スマホ画面用の矢印ボタン */}
      <div className="flex gap-3 md:hidden">
        {previousPage && (
          <Link href={`?page=${previousPage}`}>
            <Button className={`flex size-[50px] items-center justify-center rounded`}>&lt;</Button>
          </Link>
        )}
        {nextPage && (
          <Link href={`?page=${nextPage}`}>
            <Button className={`flex size-[50px] items-center justify-center rounded`}>&gt;</Button>
          </Link>
        )}
      </div>

      {/* デスクトップ画面用のページ番号 */}
      <div className="hidden justify-center space-x-2 md:flex">
        {pageNumbers.map((page, index) =>
          typeof page === "string" ? (
            <div key={index} className="px-2 py-4">
              {page}
            </div>
          ) : (
            <Link href={`?page=${page}`} key={index}>
              <Button className={`flex size-[50px] items-center justify-center rounded`}>{page}</Button>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
