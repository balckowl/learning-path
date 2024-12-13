import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MoreBtn() {
  return (
    <div className="flex justify-center">
      <Link href={`/gallary`} className="group flex items-center gap-3 text-yellow-500">
        記事一覧へ
        <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
