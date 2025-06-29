import Logo from "./Logo";

function EmptyBox() {
  return (
    <div className=" flex-col  dark:bg-main-bg-color-dark bg-main-bg-color md:flex hidden gap-2 justify-center items-center">
      <div className="h-[20rem] w-[30rem]  flex items-center overflow-hidden dark:bg-[url('/logo-name-dark.png')] bg-[url('/logo-name.png')] bg-cover bg-center"></div>
    </div>
  );
}

export default EmptyBox;
