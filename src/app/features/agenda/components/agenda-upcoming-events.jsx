import Heading from "../../../shared/ui/heading";

function AgendaUpcomingEvents() {
  return (
    <aside className="bg-main-bg-color-2 p-[2rem] border-gray-100 border rounded-3xl ">
      <Heading as="h4">Próximos eventos</Heading>
      <ul className="">
        <li className="py-3 bg-white  hover:bg-gray-50 border-b ">
          <p className="font-medium ">Reunião de Planejamento</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Hoje - 15:00</span>
            <div className="flex">
              <img
                className="w-[2.4rem] border-[2px] border-white translate-x-1 z-1 h-[2.4rem] rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-20 -translate-x-2 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-30 -translate-x-4 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-40 -translate-x-6 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
            </div>
          </div>
        </li>
        <li className="py-3 bg-white border-b  hover:bg-gray-50">
          <p className="font-medium">Deadline Projeto X</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Hoje - 15:00</span>
            <div className="flex">
              <img
                className="w-[2.4rem] border-[2px] border-white translate-x-1 z-1 h-[2.4rem] rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-20 -translate-x-2 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-30 -translate-x-4 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-40 -translate-x-6 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
            </div>
          </div>
        </li>
        <li className="py-3 bg-white  hover:bg-gray-50">
          <p className="font-medium">Revisão Sprint</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Hoje - 15:00</span>
            <div className="flex">
              <img
                className="w-[2.4rem] border-[2px] border-white translate-x-1 z-1 h-[2.4rem] rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-20 -translate-x-2 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-30 -translate-x-4 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
              <img
                className="w-[2.4rem] h-[2.4rem] border-[2px] border-white z-40 -translate-x-6 rounded-full"
                src="/default-user.jpg"
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default AgendaUpcomingEvents;
