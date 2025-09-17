import { Ellipsis } from "lucide-react";
import Table from "../../../shared/ui/table";
import { formatDate } from "../../../shared/utils/helpers/";
import CheckBox from "../../../shared/ui/check-box";
function ProjectListRow({ data: { name, createdAt, createdBy, endDate } }) {
  return (
    <Table.Row>
      <div className="flex items-center justify-center">
        <CheckBox />
      </div>
      <div className="flex p-[1rem] gap-[1rem] items-center">
        <img src="/default-user.jpg" className="w-[3.5rem]" alt="" />
        <div className="w-full ">
          <span className=" text-main-text-color flex items-center">
            {name}
          </span>
        </div>
      </div>
      <span className="p-[1.5rem_1rem] flex items-center">
        {createdBy.name}
      </span>
      <span className="p-[1.5rem_1rem] flex items-center">
        {formatDate(new Date(createdAt), true)}
      </span>
      <span className="p-[1.5rem_1rem] flex items-center">
        {formatDate(new Date(endDate), true)}
      </span>
      <div className="p-[1.5rem_1rem] flex items-center">
        <div className="w-full relative h-[1rem] rounded-full overflow-hidden bg-gray-200">
          <span className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-blue-600"></span>
        </div>
      </div>
      <span className="flex w-full  justify-center items-center">
        <Ellipsis />
      </span>
    </Table.Row>
  );
}

export default ProjectListRow;
