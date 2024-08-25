import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Blockpage from "@/app/components/new/blockpage";
import CreateArticleHome from "@/app/components/new/createArticleHome";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) return <Blockpage />;

  return (
    <div>
      <CreateArticleHome />
    </div>
  );
}
