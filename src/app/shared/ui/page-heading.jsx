function PageHeader({ title, description, children }) {
  return (
    <header className="flex p-[2rem] items-center justify-between">
      <div>
        <h2 className="text-[1.8rem] text-main-text-color font-semibold">
          {title}
        </h2>
        <span className="flex max-w-[50rem] text-secondary-text-color text-[1.4rem]">
          {description}
        </span>
      </div>
      {children}
    </header>
  );
}

export default PageHeader;
