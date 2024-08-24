// Card.tsx

import Image from "next/image";

interface CardProps {
  title: string;
  content: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
}

export default function Card({ title, content, description, imageAlt, imageSrc }: CardProps) {
  return (
    <div className="mx-auto rounded-lg bg-yellow-100 p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="flex items-center">
        <Image src={imageSrc} alt={imageAlt} width={300} height={200} className="mr-4" />
        <p className="text-xl">{description}</p>
      </div>
      <p className="mt-4 text-gray-700">{content}</p>
    </div>
  );
}
