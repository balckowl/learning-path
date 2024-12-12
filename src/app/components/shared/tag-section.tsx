import { Tag } from "@prisma/client";
import { Tag as TagIcon } from "lucide-react";
import Link from "next/link";

export default async function TagSection() {
  const res = await fetch(`${process.env.BASE_URL}/api/tags`);

  const tags: Tag[] = await res.json();

  return (
    <div className="bg-red-300">
      <div className="flex justify-center">
        <div className="w-[95%] px-[10px] py-[150px] pt-[100px] lg:w-[70%]">
          <div>
            <h2 className="mb-[50px] text-center text-[35px] font-bold">タグから探す</h2>
            <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
              {tags.map((tag) => (
                <Link href={`/tag/${tag.id}`} key={tag.id}>
                  <div className="flex items-center gap-3 rounded-md border bg-white p-4">
                    <h3 className="flex items-center gap-3 text-[17px] font-bold">
                      <TagIcon /> {tag.name}
                    </h3>
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
