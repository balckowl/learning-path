import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-slate-200 text-4xl">
      <div className="container flex items-center justify-between py-2">
        <h1 className="font-bold">Tech Path</h1>
        <Button className="bg-[#67A637]">ログイン</Button>
      </div>
    </header>
  );
}
