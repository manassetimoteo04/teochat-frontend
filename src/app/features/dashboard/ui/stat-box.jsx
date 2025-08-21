import Tag from "../../../shared/ui/tag";
function StatBox({ stat }) {
  return (
    <div className=" p-[2rem] border-r last:border-r-0 border-main-border-color">
      <div className="flex justify-between items-center text-secondary-text-color">
        <span className=" text-[1.4rem] ">{stat.title}</span>
        <span className="text-[1.2rem]">
          <Tag>{stat.change}</Tag>
        </span>
      </div>
      <div>
        <p className="text-[2.8rem] ">{stat.value}</p>
      </div>
    </div>
  );
}

export default StatBox;
