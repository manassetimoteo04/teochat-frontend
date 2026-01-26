import Tag from "../../../shared/ui/tag";
import Spinner from "../../../shared/ui/Spinner";
import { formatDate } from "../../../shared/utils/helpers";
import { useCompanyRecentMembers } from "../../companies/hooks/use-company-recent-members";
import CardBox from "../ui/card-box";
import EmptyList from "../../../shared/ui/empty-list";

function DashboardRecentMembers() {
  const { data, isPending } = useCompanyRecentMembers();
  return (
    <CardBox title="Aderidos Recentemente">
      <div className="min-h-[30rem]">
        {!isPending && data?.length < 1 && (
          <EmptyList
            title="Nenhuma equipa foi encontrada"
            opensId="invite-new-member"
          />
        )}
        {!isPending ? (
          data?.map((user) => (
            <div
              key={user.id}
              className="grid p-[0.5rem_2rem] items-center grid-cols-[5rem_1fr] gap-[0rem]"
            >
              <img
                src={user.avatar}
                alt=""
                className="w-[5rem] rounded-full h-[5rem]"
              />
              <div className="flex hover:bg-gray-100 rounded-xl  p-[0.5rem_1rem] justify-between items-center">
                <div>
                  <p className="text-main-text-color">{user.name}</p>
                  <span className="text-secondary-text-color text-[1.4rem]">
                    {user.email} &mdash;{" "}
                    {formatDate(new Date(user.companies.joined))}
                  </span>
                </div>
                {/* <div className="flex gap-[0.5rem]">
                  <Tag>web designer</Tag>
                  <Tag>stock</Tag>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </CardBox>
  );
}

export default DashboardRecentMembers;
