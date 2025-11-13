import Tag from "../../../shared/ui/tag";
function StatBox({ stat }) {
  return (
    <div className=" p-[1rem_2rem] bg-white rounded-3xl  flex flex-col gap-[0.1rem] border  border-gray-100">
      <div className="flex justify-between items-center text-secondary-text-color">
        <span className=" text-[1.4rem] ">{stat.title}</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[3.8rem] ">{stat.value}</p>
        <div className="text-main-text-color w-[5rem] h-[5rem] rounded-full flex items-center justify-center bg-green-100">
          {stat.icon}
        </div>
      </div>
    </div>
  );
}

export default StatBox;
