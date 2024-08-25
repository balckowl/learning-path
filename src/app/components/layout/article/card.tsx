// Card.tsx
import Image from "next/image";
import Link from "next/link";

import { Node } from "@/types/gallery-articles";

export default function Card({ index, node }: { index: number; node: Node }) {
  return (
    <div className="mx-auto rounded-lg border bg-[#fffefc] p-6 shadow-sm">
      <Link href={node.nodeUrl}>
        <h3 className="mb-4 text-[23px] font-semibold">
          {index + 1}.{node.nodeTitle}
        </h3>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Image
            src={node.ogp["og:image"]}
            alt={node.ogp["og:title"]}
            width={300}
            height={200}
            className="mb-[10px] mr-4 w-full md:mb-0 md:w-[35%]"
          />
          <p className="w-full text-xl md:w-[65%]">{node.ogp["og:title"]}</p>
        </div>
        <p className="mt-4 rounded-md border bg-white p-4 text-gray-700">{node.comment}</p>
      </Link>
    </div>
  );
}
