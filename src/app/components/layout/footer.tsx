import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center py-[70px]">
        <div className="flex w-[95%] flex-col items-center rounded-md border p-[30px] lg:w-4/5 lg:p-[100px]">
          <h2 className="mb-[10px] text-[40px] font-bold lg:text-[80px]">Lets create path.</h2>
          <Button>記事を書く</Button>
        </div>
      </div>
      <div className="h-[50px]">
        <div className="container flex h-full items-center justify-center border-t py-2">
          <small>&copy; Tech Path 2024</small>
        </div>
      </div>
    </footer>
  );
}
