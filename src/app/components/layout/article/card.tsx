// Card.tsx
import Image from "next/image";
import Link from "next/link";

import { Node } from "@/types/gallery-articles";

export default function Card({ node }: { node: Node }) {
  return (
    <div className="mx-auto rounded-lg bg-yellow-100 p-6 shadow-sm">
      <Link href={node.nodeUrl}>
        <h3 className="mb-4 text-lg font-semibold">{node.ogp["og:title"]}</h3>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Image
            src={node.ogp["og:image"]}
            alt={node.ogp["og:title"]}
            width={300}
            height={200}
            className="mb-[10px] mr-4 w-full md:mb-0 md:w-[35%]"
          />
          <p className="w-full text-xl md:w-[65%]">{node.nodeTitle}</p>
        </div>
        <p className="mt-4 text-gray-700">{node.comment}</p>
      </Link>
    </div>
  );
}
