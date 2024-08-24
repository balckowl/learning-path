"use client";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LoginBtn() {
  return (
    <Button className="bg-[#67A637]" onClick={() => signIn()}>
      ログイン
    </Button>
  );
}
