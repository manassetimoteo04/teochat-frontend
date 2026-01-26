import { Grid2X2, List } from "lucide-react";

export default function ProjectDetailsNav() {
  return (
    <div className="border-b-gray-200 border-b p-[2rem] flex items-center gap-[2rem]">
      <button className="flex items-center gap-[0.4rem]">
        <Grid2X2 /> Cards
      </button>
      <button className="flex items-center gap-[0.4rem]">
        <List /> Lista
      </button>
    </div>
  );
}
