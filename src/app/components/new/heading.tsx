import { Play } from "lucide-react";

type Props = {
  title: string;
  description?: string | null;
};

export default function Heading({ title, description }: Props) {
  return (
    <div className="mb-[15px]">
      <h2 className="mb-[5px] flex items-center gap-3">
        <Play />
        <span className="text-[25px] font-bold">{title}</span>
      </h2>
      {description && <p className="text-[12px] text-[#ccc]">{description}</p>}
    </div>
  );
}
