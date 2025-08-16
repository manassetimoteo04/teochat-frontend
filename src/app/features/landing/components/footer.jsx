import { Mail } from "lucide-react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

function footer() {
  return (
    <footer className="bg-gray-950 p-[10rem_0rem] pb-0">
      <div className="max-w-[120rem] flex justify-between m-[0_auto]">
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-bold text-white mb-3">
            <h1 className="flex items-center text-[2.4rem] relative">
              <img src="./logo.png" className="w-[3.5rem] h-auto" />
              TeoChat
              <span className=" inline-block w-[0.8rem] absolute -right-[1rem] bottom-[0.4rem] h-[0.8rem] rounded-full bg-main-color">
                &nbsp;
              </span>
            </h1>
          </h3>
          <p className="text-white max-w-[40rem]">
            A plataforma que conecta sua equipe em um só lugar. Chats, chamadas
            e eventos de forma simples e segura.
          </p>
        </div>
        <div>
          <div>
            <h4 className=" text-white mb-4">Siga-nos</h4>
            <div className="flex gap-10 text-gray-300">
              <a href="#" className="hover:text-white">
                <BsTwitterX />
              </a>{" "}
              <a href="#" className="hover:text-white">
                <BsInstagram />
              </a>{" "}
              <a href="#" className="hover:text-white">
                <BsLinkedin />
              </a>{" "}
              <a href="#" className="hover:text-white">
                <BsFacebook />
              </a>
            </div>
            <p className="text-white flex items-center gap-[0.5rem] mt-[1rem]">
              <Mail size={20} /> contato@teochat.com
            </p>
          </div>
        </div>
      </div>
      <div className="text-center border-t-[1px] border-main-border-color-dark p-[6rem_2rem] text-gray-300 mt-10">
        © {new Date().getFullYear()} TeoChat. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default footer;
