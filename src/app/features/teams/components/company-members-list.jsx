import InputSearch from "../../../shared/ui/input-search";

function CompanyListMembers() {
  return (
    <div className="p-[0_3rem] mb-[10rem]">
      <div className="bg-white p-[2rem] border border-gray-100 rounded-2xl">
        <header className="flex flex-col">
          <h4>Participantes</h4>
          <div className="flex justify-start">
            <div>
              <InputSearch />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default CompanyListMembers;
