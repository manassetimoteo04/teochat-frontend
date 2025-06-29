import UserSmallImg from "../../ui/UserSmallImg";

function ContactBox({ contact }) {
  return (
    <div
      className={` grid hover:bg-gray-200 dark:hover:bg-slate-800/50 rounded-lg items-center p-4  gap-5 md:gap-4 md:grid-cols-[5rem_1fr] grid-cols-[3.5rem_1fr]
      `}
    >
      <UserSmallImg url={contact.img} alt={contact.name} />
      <div className="flex flex-col  justify-center">
        <div className="flex justify-between items-center">
          <p className="text-main-text-color dark:text-main-text-color-dark">
            {contact.name}
          </p>
        </div>
        <div>
          <span className="text-secondary-text-color dark:text-secondary-text-color-dark text-[1.4rem]">
            {contact.bio}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactBox;
