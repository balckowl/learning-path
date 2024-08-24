import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="container flex items-center justify-between bg-slate-200 text-4xl">
      <h1 className="font-bold">Tech Path</h1>
      <Button className="bg-[#67A637]">ログイン</Button>
    </header>
  );
}
