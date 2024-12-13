"use client";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LoginBtn() {
  return (
    <Button
      onClick={() => signIn()}
      variant="ghost"
      className="flex gap-2 rounded-full bg-green-300 hover:bg-green-400"
    >
      <LogIn size={15} />
      ログイン
    </Button>
  );
}
