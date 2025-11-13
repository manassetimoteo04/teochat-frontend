import Heading from "../../../shared/ui/heading";
function CardBox({ title, children, action }) {
  return (
    <div className=" pb-[1rem] rounded-3xl border bg-white border-gray-100 ">
      <header className="p-[1rem_2rem] pt-[2rem] flex justify-between items-center">
        <Heading>{title}</Heading>
        {action}
      </header>
      {children}
    </div>
  );
}

export default CardBox;
