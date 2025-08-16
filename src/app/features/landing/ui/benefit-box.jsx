function BenefitBox({ benefit }) {
  const { title, description, icon, color } = benefit;
  return (
    <div className="p-[2rem] overflow-hidden relative bg-main-bg-color-2 shadow-sm  rounded-2xl  grid grid-cols-[1fr_20rem] gap-[1rem]">
      <div>
        <h3 className="mb-3">{title}</h3>
        <div>
          <p className="text-secondary-text-color">{description}</p>
        </div>
      </div>
      <div
        className="absolute w-[20rem] flex items-center justify-center opacity-30 right-0 h-full z-[0] top-0 overflow-hidden bg-repeat  pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M20 0 L0 0 0 20" fill="none" stroke="%23d1d5db" stroke-width="1"/></svg>')`,
        }}
      ></div>
      <div
        className={`${color} absolute w-[20rem] flex items-center justify-center right-0 h-full z-[0] top-0 text-secondary-text-color`}
        style={{
          background:
            "radial-gradient(circle, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.068) 40%, rgba(200,200,200,0) 100%)",
        }}
      >
        {icon}
      </div>
      <div className="absolute bg-gradient-to-r from-white to-transparent h-full w-[5rem] right-[15rem] top-0" />
    </div>
  );
}

export default BenefitBox;
