"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LoginBtn() {
  return (
    <Button className="w-full" onClick={() => signIn()}>
      ログイン
    </Button>
  );
}
