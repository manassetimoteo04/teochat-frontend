import { Filter, ListFilter, SortAsc } from "lucide-react";
import ButtonIcon from "../../../shared/ui/button-icon";
import InputSearch from "../../../shared/ui/input-search";
import Table from "../../../shared/ui/table";
import ProjectListRow from "./project-list-row";

const list = [
  {
    id: "68c7fe3dd72351732c724f80",
    name: "Projecto Social",
    createdAt: "2025-09-15T11:53:34.005Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit dignissimos perferendis veritatis accusamus pariatur non nisi soluta modi error harum neque quisquam nostrum porro quas facilis, quia voluptatum saepe.",
    createdBy: {
      id: "68b74275c909a75829ff1224",
      name: "Manasse Timóteo",
      email: "manasse@gmail.com",
      avatar: "https://source.unsplash.com/random/100x100/?undefined&sig=1650",
    },
    updatedAt: "2025-09-15T11:53:34.005Z",
    tags: ["project, ideias, social"],
    teamId: "68bcb8962d53bfa78eda010b",
    startDate: "2025-09-02T19:17:37.646Z",
    endDate: "2025-09-02T19:17:37.646Z",
  },
  {
    id: "68c7fe9ec88b406366bd129f",
    name: "Projecto Social",
    createdAt: "2025-09-15T11:55:10.833Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit dignissimos perferendis veritatis accusamus pariatur non nisi soluta modi error harum neque quisquam nostrum porro quas facilis, quia voluptatum saepe.",
    createdBy: {
      id: "68b74275c909a75829ff1224",
      name: "Manasse Timóteo",
      email: "manasse@gmail.com",
      avatar: "https://source.unsplash.com/random/100x100/?undefined&sig=1650",
    },
    updatedAt: "2025-09-15T11:55:10.833Z",
    tags: ["project", " ideias", " social"],
    teamId: "68bcb8962d53bfa78eda010b",
    startDate: "2025-09-02T19:17:37.646Z",
    endDate: "2025-09-02T19:17:37.646Z",
  },
  {
    id: "68c7fec6b7ef17fa5800b36c",
    name: "Projecto TeoChat",
    createdAt: "2025-09-15T11:55:51.066Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit dignissimos perferendis veritatis accusamus pariatur non nisi soluta modi error harum neque quisquam nostrum porro quas facilis, quia voluptatum saepe.",
    createdBy: {
      id: "68b74275c909a75829ff1224",
      name: "Manasse Timóteo",
      email: "manasse@gmail.com",
      avatar: "https://source.unsplash.com/random/100x100/?undefined&sig=1650",
    },
    updatedAt: "2025-09-15T13:08:29.473Z",
    tags: ["project, ideias, social"],
    teamId: "68bcb8962d53bfa78eda010b",
    startDate: "2025-09-02T19:17:37.646Z",
    endDate: "2025-09-02T19:17:37.646Z",
  },
  {
    id: crypto.randomUUID(),
    name: "Projecto TeoChat",
    createdAt: "2025-09-15T11:55:51.066Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit dignissimos perferendis veritatis accusamus pariatur non nisi soluta modi error harum neque quisquam nostrum porro quas facilis, quia voluptatum saepe.",
    createdBy: {
      id: "68b74275c909a75829ff1224",
      name: "Manasse Timóteo",
      email: "manasse@gmail.com",
      avatar: "https://source.unsplash.com/random/100x100/?undefined&sig=1650",
    },
    updatedAt: "2025-09-15T13:08:29.473Z",
    tags: ["project, ideias, social"],
    teamId: "68bcb8962d53bfa78eda010b",
    startDate: "2025-09-02T19:17:37.646Z",
    endDate: "2025-09-02T19:17:37.646Z",
  },
  {
    id: crypto.randomUUID(),
    name: "Projecto TeoChat",
    createdAt: "2025-09-15T11:55:51.066Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odit dignissimos perferendis veritatis accusamus pariatur non nisi soluta modi error harum neque quisquam nostrum porro quas facilis, quia voluptatum saepe.",
    createdBy: {
      id: "68b74275c909a75829ff1224",
      name: "Manasse Timóteo",
      email: "manasse@gmail.com",
      avatar: "https://source.unsplash.com/random/100x100/?undefined&sig=1650",
    },
    updatedAt: "2025-09-15T13:08:29.473Z",
    tags: ["project, ideias, social"],
    teamId: "68bcb8962d53bfa78eda010b",
    startDate: "2025-09-02T19:17:37.646Z",
    endDate: "2025-09-02T19:17:37.646Z",
  },
];
function ProjectsList() {
  return (
    <div className="bg-white p-[2rem] border border-gray-100 rounded-2xl">
      <div className="flex justify-between items-center mb-[2rem]">
        <div>
          <InputSearch />
        </div>
        <div>
          <ButtonIcon>
            <SortAsc />
          </ButtonIcon>
          <ButtonIcon>
            <ListFilter />
          </ButtonIcon>
        </div>
      </div>
      <Table columns="4rem 1.3fr 1fr 0.8fr 0.8fr 0.8fr 4rem">
        <Table.Header>
          <span className="p-[1.5rem_1rem]  flex items-center"></span>
          <span className="p-[1.5rem_1rem]  flex items-center">Nome</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Criado Por</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Criado Em</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Término</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Progresso</span>
        </Table.Header>
        <Table.Body
          data={list}
          render={(data) => <ProjectListRow data={data} key={data.id} />}
        />
      </Table>
    </div>
  );
}

export default ProjectsList;
