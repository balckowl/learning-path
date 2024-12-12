import { Tag } from "@prisma/client";
import { getServerSession } from "next-auth/next";

import Blockpage from "@/app/components/new/blockpage";
import CreateArticleHome from "@/app/components/new/createArticleHome";
import { Option } from "@/components/ui/multiple-selector";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return <Blockpage />;

  const categoriesRes = await fetch(`${process.env.BASE_URL}/api/categories`, { cache: "no-store" });
  const categories = await categoriesRes.json();
  const allTagsRes = await fetch(`${process.env.BASE_URL}/api/tags`, { cache: "no-store" });
  const allTags: Tag[] = await allTagsRes.json();

  const options: Option[] = allTags.map((tag) => ({ label: tag.name, value: tag.id }));

  return (
    <div>
      <CreateArticleHome categories={categories} options={options} />
    </div>
  );
}
