"use client";

import { LogIn, PenBoxIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function RecommendLogin() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[95%] px-[10px] py-[100px] lg:w-[70%]">
          <div className="rounded-md border p-[50px] xl:grid xl:grid-cols-4">
            <div className="col-span-2 flex flex-col justify-between">
              <h2 className="mb-[15px] text-[30px] font-bold">あなたも記事を投稿しよう</h2>
              <p className="mb-[15px]">
                既存の記事や学習動画からオリジナルのITに関する学習ルートを制作、投稿することができます。
              </p>
              {!session ? (
                <Button
                  variant="outline"
                  className="flex w-max items-center gap-2 rounded-full py-6"
                  onClick={() => signIn()}
                >
                  <LogIn size={15} />
                  ログイン
                </Button>
              ) : (
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/new" className="flex w-max items-center gap-2 py-6">
                    <PenBoxIcon size={15} />
                    投稿する
                  </Link>
                </Button>
              )}
            </div>
            <div className="xl:col-span-1"></div>
            <div className="col-span-1 flex justify-center">
              <Image src="/doc.png" width={250} height={250} alt="書類" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
