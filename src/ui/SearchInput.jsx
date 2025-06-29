import { HiOutlineSearch } from "react-icons/hi";

function SearchInput({ value, setValue }) {
  return (
    <div
<<<<<<< HEAD
      className=" rounded-[0.6rem] border border-[#E5E5E5]
=======
      className=" dark:border-gray-700 rounded-[0.6rem] border border-[#E5E5E5]
>>>>>>> 26a9d0f (primeiro commit)
      w-full overflow-hidden h-[4rem] grid grid-cols-[3.5rem_1fr]"
    >
      <span className="items-center flex text-[2rem]  text-gray-500 justify-center">
        <HiOutlineSearch />
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Pesquisar"
<<<<<<< HEAD
        className="w-full h-full p-[0.8rem] text-inherit focus:outline-none "
=======
        className="w-full h-full dark:text-gray-50 bg-transparent p-[0.8rem] text-inherit focus:outline-none "
>>>>>>> 26a9d0f (primeiro commit)
      />
    </div>
  );
}

export default SearchInput;
