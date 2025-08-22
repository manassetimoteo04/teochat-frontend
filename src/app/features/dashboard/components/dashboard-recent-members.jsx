import Tag from "../../../shared/ui/tag";
import CardBox from "../ui/card-box";

function DashboardRecentMembers() {
  return (
    <CardBox title="Aderidos Recentemente">
      <div>
        <div className="grid p-[0.5rem_2rem] items-center grid-cols-[5rem_1fr] gap-[0rem]">
          <img
            src="/default-user.jpg"
            alt=""
            className="w-[5rem] rounded-full h-[5rem]"
          />
          <div className="flex hover:bg-gray-100 rounded-xl  p-[0.5rem_1rem] justify-between items-center">
            <div>
              <p className="text-main-text-color">Manasse Timóteo</p>
              <span className="text-secondary-text-color text-[1.4rem]">
                timoteo@gmail.com &mdash; há 10 min
              </span>
            </div>
            <div className="flex gap-[0.5rem]">
              <Tag>web designer</Tag>
              <Tag>stock</Tag>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  );
}

export default DashboardRecentMembers;
