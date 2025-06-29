import {
  HiArrowLeft,
  HiOutlineChatBubbleLeft,
  HiOutlineEllipsisVertical,
  HiOutlineHeart,
  HiOutlineMinusCircle,
  HiOutlinePhone,
  HiOutlinePhoto,
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Heading from "../../ui/Heading";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import UserSmallImg from "../../ui/UserSmallImg";
import clsx from "clsx";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";

function ConversationDetails() {
  const { ref, intersecting } = useIntersectionObserver();
  const { setConversationDetails, conversationDetails } =
    useCurrentConversation();

  return (
    <div
      className={` ${
        conversationDetails ? clsx`translate-x-[0]` : ""
      }bg-main-bg-color absolute top-0  sm:relative  sm:translate-x-[0] z-[9999999999999999] stop-0 left-0 w-full h-[100dvh]   dark:bg-main-bg-color-dark lg:border-l-[1px] border-main-border-color dark:border-main-border-color-dark`}
    >
      <header className="p-[2rem] bg-gradient-to-t from-main-bg-color/5 to-main-bg-color/90 dark:from-main-bg-color-dark/0 dark:to-main-bg-color-dark absolute top-0 left-0 w-full h-[6.7rem] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ButtonIcon onClick={() => setConversationDetails(false)}>
            <HiArrowLeft />
          </ButtonIcon>
          <div
            className={`flex items-center gap-[1rem] ease-in-out duration-300 ${
              intersecting ? clsx`opacity-0` : clsx`opacity-1`
            }`}
          >
            <UserSmallImg url="/default-user.jpg" alt="" />
            <div className="flex flex-col  justify-center">
              <p className="font-[600] text-[1.4rem] text-main-text-color dark:text-main-text-color-dark">
                Manasse Timóteo
              </p>
            </div>
          </div>
        </div>
        <ButtonIcon>
          <HiOutlineEllipsisVertical />
        </ButtonIcon>
      </header>

      <div className="flex flex-col gap-[2rem] h-screen overflow-y-scroll">
        <div
          ref={ref}
          className=" flex mt-[8rem]  gap-[2rem] items-center flex-col w-full"
        >
          <img
            src="/default-user.jpg"
            alt=""
            className="rounded-full w-[15rem]"
          />
          <div className=" flex items-center flex-col w-full">
            <Heading size="2.4rem">Manasse Timóteo</Heading>
            <span className="text-secondary-text-color dark:text-secondary-text-color-dark text-[1.4rem]">
              manassetimoteo4@gmail.com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[2rem] px-[2rem] items-center justify-center">
          <button className="dark:text-main-color flex-col p-[1rem] hover:bg-gray-200 border-main-border-color dark:border-main-border-color-dark hover:cursor-pointer dark:hover:bg-main-bg-color-dark-2  border-[1px] rounded-2xl flex   items-center">
            <HiOutlinePhone className="text-[2.4rem]" />
            Chamada
          </button>
          <button className="dark:text-main-color flex-col p-[1rem] hover:bg-gray-200 border-main-border-color dark:border-main-border-color-dark hover:cursor-pointer dark:hover:bg-main-bg-color-dark-2  border-[1px] rounded-2xl flex   items-center">
            <HiOutlineVideoCamera className="text-[2.4rem]" />
            Video
          </button>
          <button className="dark:text-main-color flex-col p-[1rem] hover:bg-gray-200 border-main-border-color dark:border-main-border-color-dark hover:cursor-pointer dark:hover:bg-main-bg-color-dark-2  border-[1px] rounded-2xl flex   items-center">
            <HiOutlineChatBubbleLeft className="text-[2.4rem]" />
            Mensagem
          </button>
        </div>
        <div className="bg-main-bg-color-2 dark:bg-main-bg-color-dark-2 p-[2rem]">
          <p className="text-main-text-color dark:text-main-text-color-dark">
            Estudar, trabalhar e evoluir é a meta!{" "}
          </p>
          <span className="text-secondary-text-color dark:text-secondary-text-color-dark">
            17 de maio
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
          <div className="flex gap-[2rem] items-center p-[1rem_0] cursor-pointer ">
            <HiOutlineMinusCircle className="text-[2.4rem] text-red-500 dark:text-red-500 " />
            <p className="text-red-500 dark:text-red-500">
              Bloquear Manasse Timóteo
            </p>
          </div>
          <div className="flex gap-[2rem] items-center p-[1rem_0] cursor-pointer ">
            <HiOutlineTrash className="text-[2.4rem] text-red-500  dark:text-red-500" />
            <p className="text-red-500 dark:text-red-500">Eliminar Conversas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationDetails;
