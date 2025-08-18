function Logo() {
  return (
    <h1 className="flex items-center sm:text-[2.4rem] relative">
      <img
        src="/logo.png"
        alt="TeoChat Logo"
        className="sm:w-[3.5rem] w-[2.5rem] h-auto"
      />
      TeoChat
      {/* <span className=" inline-block w-[0.5rem] h-[0.5rem] sm:w-[0.8rem] absolute -right-[1rem] bottom-[0.7rem] sm:h-[0.8rem] rounded-full bg-main-color">
        &nbsp;
      </span> */}
    </h1>
  );
}

export default Logo;
