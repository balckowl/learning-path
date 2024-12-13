import { PenBoxIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CreateArticleBtn() {
  return (
    <Button variant="ghost" className="flex gap-2 rounded-full bg-green-300 hover:bg-green-400" asChild>
      <Link href="/new">
        <PenBoxIcon size={15} />
        投稿する
      </Link>
    </Button>
  );
}
