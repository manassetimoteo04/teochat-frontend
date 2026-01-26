function TeamDetailBox({ icon, label, value }) {
  return (
    <div className="col-span-2  md:col-span-1 flex shadow-sm w-full flex-col gap-[1rem]  bg-gray-50 border border-gray-100 rounded-2xl p-[1rem_2rem]">
      <span className="flex items-center gap-[0.5rem] text-secondary-text-color">
        {icon} {label}
      </span>
      <div>{value}</div>
    </div>
  );
}

export default TeamDetailBox;
