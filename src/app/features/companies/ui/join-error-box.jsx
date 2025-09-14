import { TriangleAlert } from "lucide-react";

function JoinErrorBox({ error }) {
  return (
    <div className="p-[2rem] text-secondary-text-color">
      <TriangleAlert />
      <h4 className=" text-main-text-color">UPS algo correu mal</h4>
      <p>{error.message}</p>
    </div>
  );
}

export default JoinErrorBox;
