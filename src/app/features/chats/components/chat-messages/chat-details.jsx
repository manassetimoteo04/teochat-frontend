import {
  HiArrowLeft,
  HiOutlineHeart,
  HiOutlineMinusCircle,
  HiOutlinePhone,
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import ButtonIcon from "../../../../shared/ui/button-icon";
import {
  HiOutlineChatBubbleLeft,
  HiOutlineEllipsisVertical,
  HiOutlinePhoto,
} from "react-icons/hi2";
import { formatDate } from "../../../../shared/utils/helpers";
import { ArchiveIcon, PencilLine, Search } from "lucide-react";
import { useArchiveChatChannel } from "../../hooks/use-archive-channel";

export function ChatDetails({ setConversationDetails, data }) {
  const { mutate, isPending } = useArchiveChatChannel();
  return (
    <div className="h-[calc(100dvh-5.5rem)] overflow-y-scroll  relative">
      <header className="p-[2rem] bg-gradient-to-t from-main-bg-color/5 to-main-bg-color/90 dark:from-main-bg-color-dark/0 dark:to-main-bg-color-dark absolute top-0 left-0 w-full h-[5.5rem]  flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ButtonIcon onClick={() => setConversationDetails(false)}>
            <HiArrowLeft />
          </ButtonIcon>
          <div
            className={`flex items-center gap-[1rem] ease-in-out duration-300 `}
          >
            <div className="flex flex-col  justify-center">
              <p className="font-[600] text-[1.4rem] text-main-text-color dark:text-main-text-color-dark">
                {data.name}
              </p>
            </div>
          </div>
        </div>
        <ButtonIcon>
          <PencilLine size={20} />
        </ButtonIcon>
      </header>

      <div className="flex flex-col gap-[2rem] h-full overflow-y-scroll">
        <div className=" flex mt-[8rem]  gap-[2rem] items-center flex-col w-full">
          <span className="w-[15rem] h-[15rem] bg-green-100 text-main-color rounded-full flex items-center justify-center">
            #
          </span>
          <div className=" flex items-center flex-col w-full">
            <h2 className="font-semibold text-[1.8rem]">{data.name}</h2>
            <span className="text-secondary-text-color dark:text-secondary-text-color-dark text-[1.4rem]">
              05 membros
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[2rem] px-[2rem] items-center justify-center">
          <button className="dark:text-main-color flex-col p-[1rem] hover:bg-gray-200 border-main-border-color dark:border-main-border-color-dark hover:cursor-pointer dark:hover:bg-main-bg-color-dark-2  border-[1px] rounded-2xl flex   items-center">
            <Search className="text-[2.4rem]" />
            Procurar
          </button>
          <button className="dark:text-main-color flex-col p-[1rem] hover:bg-gray-200 border-main-border-color dark:border-main-border-color-dark hover:cursor-pointer dark:hover:bg-main-bg-color-dark-2  border-[1px] rounded-2xl flex   items-center">
            <HiOutlineVideoCamera className="text-[2.4rem]" />
            Video
          </button>
        </div>
        <div className="bg-main-bg-color-2 dark:bg-main-bg-color-dark-2 p-[2rem]">
          <p className="text-main-text-color dark:text-main-text-color-dark">
            {data.description}
          </p>
          <span className="text-secondary-text-color dark:text-secondary-text-color-dark">
            {formatDate(new Date(data.createdAt))}
          </span>
        </div>
        <div className="bg-main-bg-color-2 dark:bg-main-bg-color-dark-2 p-[2rem]">
          <div className="flex gap-[2rem] items-center p-[2rem_0]">
            <HiOutlinePhoto className="text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark" />
            <p className="text-main-text-color dark:text-main-text-color-dark">
              Ficheiros da Conversa
            </p>
          </div>
        </div>
        <div className="bg-main-bg-color-2 dark:bg-main-bg-color-dark-2 p-[2rem]">
          <div className="flex gap-[2rem] items-center p-[1rem_0] cursor-pointer ">
            <HiOutlineHeart className="text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark" />
            <p className="text-main-text-color dark:text-main-text-color-dark">
              Adicionar aos Favoritos
            </p>
          </div>{" "}
          <div className="flex gap-[2rem] items-center p-[1rem_0] cursor-pointer ">
            <HiOutlineUsers className="text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark" />
            <p className="text-main-text-color dark:text-main-text-color-dark">
              Criar grupo com Manasse Timóteo
            </p>
          </div>{" "}
          <div
            onClick={() => mutate(data.id)}
            className="flex gap-[2rem] items-center p-[1rem_0] cursor-pointer "
          >
            <ArchiveIcon className="text-[2.4rem] text-red-500  dark:text-red-500" />
            <p className="text-red-500 dark:text-red-500">Arquivar Canal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
