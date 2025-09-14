import { Search } from "lucide-react";

function InputSearch({ value, setValue }) {
  return (
    <div className=" bg-gray-50  relative rounded-full border w-full flex">
      <Search
        className="absolute top-1/2 text-secondary-text-color -translate-y-1/2 left-[1rem] "
        size={20}
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Procurar..."
        className="p-[1rem_3.5rem] bg-transparent  h-full w-full focus:outline-none !transition-none"
      />
    </div>
  );
}

export default InputSearch;
