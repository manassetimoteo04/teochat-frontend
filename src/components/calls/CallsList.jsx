import Heading from "../../ui/Heading";

function CallsList() {
  return (
    <div className="bg-main-bg-color-2 border-r-[1px]  border-main-border-color dark:bg-main-bg-color-dark-2 dark:border-main-border-color-dark">
      <header className="p-[1rem_2rem] ">
        <div className="flex justify-between  items-center mb-[2rem]">
          <Heading>Chamadas</Heading>
        </div>
        <div className="flex gap-[1rem]">
          <span className="flex p-[0.1rem_1rem] dark:text-secondary-text-color-dark font-semibold dark:border-main-border-color-dark cursor-pointer text-[1.4rem] rounded-full border-[1px] border-main-border-color">
            Todas
          </span>
          <span className="flex p-[0.1rem_1rem] dark:text-secondary-text-color-dark font-semibold dark:border-main-border-color-dark cursor-pointer text-[1.4rem] rounded-full border-[1px] border-main-border-color">
            Efectuadas
          </span>
          <span className="flex p-[0.1rem_1rem] dark:text-secondary-text-color-dark font-semibold dark:border-main-border-color-dark cursor-pointer text-[1.4rem] rounded-full border-[1px] border-main-border-color">
            Perdidas
          </span>
        </div>
      </header>
    </div>
  );
}

export default CallsList;
