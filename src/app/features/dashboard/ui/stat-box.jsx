import Tag from "../../../shared/ui/tag";
function StatBox({ stat }) {
  return (
    <div className=" p-[1rem_2rem] bg-white rounded-3xl  flex flex-col gap-[0.5rem] border  border-gray-100">
      <div className="flex justify-between items-center text-secondary-text-color">
        <span className=" text-[1.4rem] ">{stat.title}</span>
        <span className="text-[1.2rem]">
          <Tag type="active">{stat.change}</Tag>
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[2.8rem] ">{stat.value}</p>
      </div>
    </div>
  );
}

export default StatBox;
