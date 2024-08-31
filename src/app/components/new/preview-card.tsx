"use client";

import Image from "next/image";
import Link from "next/link";

import { FormDataNode } from "@/types/form-data";

export default function PreviewCard({ index, node }: { index: number; node: FormDataNode }) {
  return (
    <div className="mx-auto rounded-lg border bg-[#fffefc] p-6 shadow-sm">
      <Link href={node.nodeUrl}>
        <h3 className="mb-4 text-[23px] font-semibold">
          {index + 1}.{node.nodeTitle}
        </h3>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Image
            src={"/gallery-page/no-image.png"}
            alt={"og_title"}
            width={300}
            height={200}
            className="mb-[10px] mr-4 w-full md:mb-0 md:w-[35%]"
          />
          <p className="w-full text-xl md:w-[65%]">{node.nodeTitle}</p>
        </div>
        <p className="mt-4 rounded-md border bg-white p-4 text-gray-700">{node.comment}</p>
      </Link>
    </div>
  );
}
