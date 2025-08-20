function FeatureBox({ icon, title, description }) {
  return (
    <div className="p-[2rem] bg-main-bg-color-2  shadow-sm  rounded-2xl  flex flex-col gap-[1rem]">
      <div className="w-[5rem] h-[5rem] text-white flex items-center justify-center rounded-full bg-gradient-to-t from-green-400 to-green-600">
        {icon}
      </div>
      <h3 className="">{title}</h3>
      <div>
        <p className="text-secondary-text-color">{description}</p>
      </div>
    </div>
  );
}

export default FeatureBox;
