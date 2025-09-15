import Heading from "./heading";

function PageHeader({ title, description, children }) {
  return (
    <header className="flex p-[2rem] items-center justify-between">
      <div>
        <Heading as="h2">{title}</Heading>
        <span className="flex max-w-[50rem] text-secondary-text-color text-[1.4rem]">
          {description}
        </span>
      </div>
      {children}
    </header>
  );
}

export default PageHeader;
