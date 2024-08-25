"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <li className="flex cursor-pointer items-center gap-3 border-b p-4" onClick={() => signOut()}>
      <LogOut size={15} />
      ログアウト
    </li>
  );
}
