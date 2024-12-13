"use client";

import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.min.css";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import gfm from "remark-gfm";
import remarkMath from "remark-math";

import { FormDataNode } from "@/types/form-data";

import CodeBlock from "../article/code-block";

export default function PreviewCard({ node }: { node: FormDataNode }) {
  return (
    <div className="mx-auto rounded-lg border bg-[#fffefc] p-6 shadow-sm">
      <Link href={node.nodeUrl}>
        <h3 className="mb-4 text-[23px] font-semibold">
          {`${node.nodeTitle ? node.nodeTitle : "ここにノードタイトル"}`}
        </h3>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <Image
            src={"/gallery-page/no-image.png"}
            alt={"og_title"}
            width={300}
            height={200}
            className="mb-[10px] mr-4 w-full border md:mb-0 md:w-2/5"
          />
          <p className="w-full text-xl md:w-[65%]">{"ここに記事のタイトルが入ります"}</p>
        </div>
        {node.comment && (
          <ReactMarkdown
            className="mt-4 rounded-md border bg-white p-4"
            children={node.comment}
            components={{
              code: CodeBlock,
            }}
            remarkPlugins={[gfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          />
        )}
      </Link>
    </div>
  );
}
