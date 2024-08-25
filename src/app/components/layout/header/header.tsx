import Link from "next/link";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import CreateArticleBtn from "./create-article-btn";
import LoginBtn from "./login-btn";
import LogoutBtn from "./logout-btn";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="h-[60px]">
      <div className="container flex h-full items-center justify-between">
        <Link href="/">
          <h1 className="text-[25px] font-bold">Tech Path</h1>
        </Link>
        <div className="flex items-center gap-3">
          {/*ユーザーアイコン*/}
          {session && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="size-9 cursor-pointer border">
                  <AvatarImage src={session.user.image as string} alt="@user" className="size-9" />
                  <AvatarFallback>{session.user.name}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[170px] p-0">
                <ul>
                  <li className="border-b p-4 font-bold">{session.user.name}</li>
                  <LogoutBtn />
                </ul>
              </PopoverContent>
            </Popover>
          )}

          {session ? <CreateArticleBtn /> : <LoginBtn />}
        </div>
      </div>
    </header>
  );
}
