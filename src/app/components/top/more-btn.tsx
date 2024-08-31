import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MoreBtn() {
  return (
    <div className="flex justify-center">
      <Link href="/" className="flex items-center gap-3 text-yellow-500">
        記事一覧へ
        <ArrowRight />
      </Link>
    </div>
  );
}
