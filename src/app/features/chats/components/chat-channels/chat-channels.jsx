import { Search } from "lucide-react";
import { useGetTeamDetails } from "../../../teams/hooks/use-get-team-details";
import { Channels } from "./channels";
import Spinner from "../../../../shared/ui/Spinner";

export function ChatChannels() {
  const { data, isPending } = useGetTeamDetails();
  return (
    <div className="h-[calc(100dvh-5.5rem)] overflow-hidden border-r border-emerald-100 bg-white">
      {isPending && <Spinner />}

      {!isPending && (
        <>
          <header className="h-[12rem] flex flex-col gap-[1rem] border-b border-emerald-100 p-[2rem] bg-[linear-gradient(180deg,_#ecfdf5_0%,_#ffffff_100%)]">
            <h2 className="font-semibold text-main-text-color text-[2.2rem]">
              Chats{" "}
              <span className="text-[1.5rem] font-normal text-secondary-text-color">
                {data?.name}
              </span>
            </h2>

            <div className="border focus-within:border-emerald-400 focus-within:bg-white relative p-[2rem] flex items-center border-emerald-200 rounded-2xl overflow-hidden shadow-sm">
              <Search
                size={20}
                className="text-secondary-text-color absolute left-[0.8rem] top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Procurar canais..."
                className="p-[1rem] transition-none focus:outline-none absolute top-0 left-[3rem] h-full w-full bg-transparent"
              />
            </div>
          </header>
          <Channels />
        </>
      )}
    </div>
  );
}
