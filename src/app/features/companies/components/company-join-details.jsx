import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { ArrowLeft } from "lucide-react";
import Tag from "../../../shared/ui/tag";

function CompanyJoinDetails() {
  const navigate = useNavigate();
  return (
    <div className="max-w-[60rem] rounded-2xl my-[8rem]  border-main-border-color bg-main-bg-color-2 m-[0_auto]">
      <header className="flex gap-[1rem] flex-col justify-between p-[2rem] border-b  border-main-border-color">
        <div className="flex justify-between items-center ">
          <h3 className="text-[1.8rem]">Convite para Aderir a Empresa</h3>
          <Button
            onClick={() => navigate(-1)}
            variation="secondary"
            className="bg-main-bg-color p-[0.8rem_2rem] flex gap-[0.5rem] text-secondary-text-color disabled:opacity-50  rounded-full  mt-3 border border-main-border-color hover:border-main-color hover:text-main-color"
          >
            <ArrowLeft /> Voltar
          </Button>
        </div>
      </header>
      <div className="p-[2rem] text-secondary-text-color">
        <h4>
          Olá <span className="text-main-text-color">Manasse Timóteo</span>,
          você foi convidado por um administrador a participar na Empresa
          TeoChat
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
                  TeoChat Commerce.
                </span>
                <div className="flex flex-nowrap gap-2 mt-3">
                  <Tag>web dev</Tag>
                  <Tag>marketing</Tag>
                  <Tag>video making</Tag>
                </div>
              </div>
            </div>

            <div className="py-[2rem] border-b">
              <span>Descrição</span>
              <p className="text-main-text-color mt-[1rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
                veniam! Eum ut accusamus laudantium corrupti eveniet aliquam nam
                voluptatem ex modi beatae veritatis eaque cum commodi illum,
                consectetur distinctio nesciunt!
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
    </div>
  );
}

export default CompanyJoinDetails;
