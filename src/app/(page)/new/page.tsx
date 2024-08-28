import { getServerSession } from "next-auth/next";

import Blockpage from "@/app/components/new/blockpage";
import CreateArticleHome from "@/app/components/new/createArticleHome";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return <Blockpage />;

  return (
    <div>
      <CreateArticleHome />
    </div>
  );
}
