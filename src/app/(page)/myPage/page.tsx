import { Trash2 } from "lucide-react";

export default async function myPage() {
  const titles = ["記事1のタイトル", "記事2のタイトル", "記事3のタイトル", "記事4のタイトル", "記事5のタイトル"];

  return (
    <div className="min-h-[calc(100vh-60px-50px)] bg-yellow-300">
      <div className="container">
        <h1 className="pt-4 text-4xl">自分の記事</h1>
        <div className="container px-[10px] py-[20px]">
          <div className="container mb-[20px]">
            {titles.map((title, index) => (
              <div
                key={index}
                className="container mb-2 flex w-full items-center justify-between rounded bg-white py-4"
              >
                <p className="text-2xl">{title}</p>
                <div className="flex gap-2">
                  <Trash2 />
                  {/* <Pencil /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
