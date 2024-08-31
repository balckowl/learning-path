import Link from "next/link";

import { Category } from "@/types/category";

export default function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <div className="bg-muted">
      <div className="flex justify-center">
        <div className="w-[95%] px-[10px] py-[150px] pt-[100px] lg:w-[70%]">
          <div>
            <h2 className="mb-[50px] text-center text-[35px] font-bold">カテゴリ一覧</h2>
            <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <Link href={`/categories/${category.id}`} key={category.id}>
                  <div className="flex items-center gap-3 rounded-md border bg-white p-4">
                    <div className="size-[60px] rounded-md bg-[#eee]" />
                    <h3 className="text-[17px] font-bold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}