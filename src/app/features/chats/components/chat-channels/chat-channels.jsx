import { Search } from "lucide-react";
import { useGetTeamDetails } from "../../../teams/hooks/use-get-team-details";
import { Channels } from "./channels";
import Spinner from "../../../../shared/ui/Spinner";

export function ChatChannels() {
  const { data, isPending } = useGetTeamDetails();
  return (
    <div className=" h-[calc(100dvh-5.5rem)] overflow-hidden border-r border-gray-200">
      {isPending && <Spinner />}

      {!isPending && (
        <>
          <header className="h-[12rem] flex flex-col gap-[1rem] border-b p-[2rem]">
            <h2 className="font-semibold text-main-text-color text-[2.4rem]">
              Chats:{" "}
              <span className="text-[1.6rem]  font-normal text-secondary-text-color">
                {" "}
                {data?.name}
              </span>
            </h2>

            <div className="border focus-within:border-main-color focus-within:bg-white relative p-[2rem] flex items-center border-gray-200 rounded-2xl overflow-hidden">
              <Search
                size={20}
                className="text-secondary-text-color absolute left-[0.8rem] top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Procurar Canais..."
                className="p-[1rem] transition-none focus:outline-none absolute top-0 left-[3rem] h-full w-full bg-transparent "
              />
            </div>
          </header>
          <Channels />
        </>
      )}
    </div>
  );
}
