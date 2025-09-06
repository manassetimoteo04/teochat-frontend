import Tag from "../../../shared/ui/tag";
function AgendaStatBox({ stat }) {
  return (
    <div className=" p-[1rem_2rem] bg-white rounded-3xl  flex flex-col gap-[0.5rem] border  border-gray-100">
      <div className="flex justify-between items-center text-secondary-text-color">
        <span className=" text-[1.4rem] ">{stat.title}</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[4.8rem] ">{stat.value}</p>
      </div>
    </div>
  );
}

export default AgendaStatBox;
