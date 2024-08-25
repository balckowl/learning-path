// Card.tsx

import Image from "next/image";

interface CardProps {
  title: string;
  content: string;
  imageAlt: string;
  imageSrc: string;
  nodeArticleTitle: string;
}

export default function Card({ title, content, imageAlt, imageSrc, nodeArticleTitle }: CardProps) {
  return (
    <div className="mx-auto rounded-lg bg-yellow-100 p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="flex flex-col md:flex-row md:items-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={300}
          height={200}
          className="mb-[10px] mr-4 w-full md:mb-0 md:w-[50%]"
        />
        <p className="w-full text-xl md:w-[50%]">{nodeArticleTitle}</p>
      </div>
      <p className="mt-4 text-gray-700">{content}</p>
    </div>
  );
}
