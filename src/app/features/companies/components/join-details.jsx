import Button from "../../../shared/ui/button";
import Tag from "../../../shared/ui/tag";

function JoinDetails({ company }) {
  return (
    <div className="p-[2rem] text-secondary-text-color">
      <h4>
        Olá <span className="text-main-text-color">Manasse Timóteo</span>, você
        foi convidado por um administrador a participar na Empresa{" "}
        <span className="text-main-text-color">{company.name}</span>
      </h4>
      <div className="mt-[2rem]">
        <span className=" text-secondary-text-color">Mais Detalhes</span>
        <div className="flex flex-col">
          <div className="flex border-b gap-[1rem] py-[2rem]  items-center">
            <img
              src="/default-user.jpg"
              className="w-[6rem] rounded-full h-[6rem]"
            />
            <div className="flex flex-col">
              <span className="text-main-text-color !text-[1.8rem] text-base ">
                {company?.name}
              </span>
              <div className="flex flex-nowrap gap-2 mt-3">
                {company?.industry?.map((indus) => (
                  <Tag key={indus}>{indus}</Tag>
                ))}
              </div>
            </div>
          </div>

          <div className="py-[2rem] border-b">
            <span>Descrição</span>
            <p className="text-main-text-color mt-[1rem]">
              {company?.description}
            </p>
          </div>

          <div className="py-[2rem]">
            <span>Criado aos</span>
            <p className="text-main-text-color mt-[1rem]">
              08 de Abril de 2025
            </p>
          </div>
          <div className="pt-[2rem] flex justify-end">
            <Button>Aceitar Convite</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinDetails;
