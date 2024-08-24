import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-slate-200 text-4xl">
      <h1 className="p-2 font-bold">Tech Path</h1>
      <Button className="mr-2 bg-[#67A637]">ログイン</Button>
    </div>
  );
}
