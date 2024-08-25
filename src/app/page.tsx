import Article from "@/app/components/gallery/Article";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Home() {
  const res = await fetch("http:/localhost:3000/api/articles");

  const articleData: GalleryArticle[] = await res.json();

  return (
    <div className="bg-yellow-300">
      <div className="container px-[10px] py-[20px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Article key={articleData[0].id} article={articleData[0]} />
        </div>
      </div>
    </div>
  );
}
