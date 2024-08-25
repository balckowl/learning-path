import { Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CreateArticleBtn() {
  return (
    <Button variant="ghost" className="flex gap-2" asChild>
      <Link href="/new">
        <Pencil size={15} />
        投稿する
      </Link>
    </Button>
  );
}
