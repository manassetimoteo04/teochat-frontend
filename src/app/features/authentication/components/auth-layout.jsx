function AuthLayout({ children }) {
  return (
    <div className="grid h-screen overflow-hidden grid-cols-[1fr_50rem]">
      <div className=" p-[2rem] bg-[rgb(3,194,73)] h-screen flex items-center justify-center">
        <img src="/ilustration2.png" className="h-[100%] " />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
