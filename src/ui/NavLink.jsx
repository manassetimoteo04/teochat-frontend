function NavLink({ to = "", icon }) {
  return (
    <Link to={to} className="text-[2rem]">
      {icon}
    </Link>
  );
}

export default NavLink;
