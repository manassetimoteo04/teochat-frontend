function Heading({ children, description }) {
  return (
    <div className="flex flex-col">
      <h1 class="text-[3.5rem]  font-bold bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent">
        {children}
      </h1>
      <span className="text-secondary-text-color">{description}</span>
    </div>
  );
}

export default Heading;
