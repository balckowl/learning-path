import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { authOptions } from "@/lib/auth";

import CreateArticleBtn from "./create-article-btn";
import LoginBtn from "./login-btn";
import LogoutBtn from "./logout-btn";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="h-[60px]">
      <div className="flex h-full justify-center">
        <div className="flex h-full w-[95%] items-center justify-between lg:w-[70%]">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src={"/image/logo.svg"} alt={"og_title"} width={30} height={30} />
              <h1 className="text-[25px] font-bold">Tech Path</h1>
            </div>
          </Link>
          <div className="flex items-center gap-5">
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
                    <Link href={"/my-page"}>
                      <li className="flex cursor-pointer items-center gap-3 border-b p-4">
                        <User size={15} />
                        自分の記事
                      </li>
                    </Link>
                    <LogoutBtn />
                  </ul>
                </PopoverContent>
              </Popover>
            )}

            {session ? <CreateArticleBtn /> : <LoginBtn />}
          </div>
        </div>
      </div>
    </header>
  );
}
