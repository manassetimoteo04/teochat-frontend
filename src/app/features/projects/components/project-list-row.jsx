import { Ellipsis, Eye, PencilLine, Trash2 } from "lucide-react";
import Table from "../../../shared/ui/table";
import { formatDate } from "../../../shared/utils/helpers/";
import CheckBox from "../../../shared/ui/check-box";
import Menus from "../../../shared/ui/Menus";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/ui/modal";
import CreateUpdateProjectForm from "./create-update-project-form";
import DeleteAlert from "../../../shared/ui/delete-alert";
import { useDeleteProject } from "../hooks/use-delete-project";
function ProjectListRow({
  onSelect,
  selected,
  data: { id, name, createdAt, createdBy, endDate },
}) {
  const navigate = useNavigate();
  const { remove, isPending } = useDeleteProject();
  return (
    <>
      <Table.Row>
        <div className="flex items-center  justify-center">
          <CheckBox
            value={selected.some((el) => el === id)}
            setValue={() => onSelect(id)}
          />
        </div>
        <div className="flex p-[1rem] gap-[1rem] items-center">
          <img src="/default-user.jpg" className="w-[3.5rem]" alt="" />
          <div className="w-full ">
            <span className=" text-main-text-color flex items-center">
              {name}
            </span>
          </div>
        </div>
        <span className="p-[1.5rem_1rem] hidden sm:flex items-center">
          {createdBy.name}
        </span>
        <span className="p-[1.5rem_1rem] hidden md:flex items-center">
          {formatDate(new Date(createdAt ?? new Date()), true)}
        </span>
        <span className="p-[1.5rem_1rem] hidden lg:flex items-center">
          {formatDate(new Date(endDate ?? new Date()), true)}
        </span>
        <div className="p-[1.5rem_1rem] hidden lg:flex items-center">
          <div className="w-full relative h-[1rem] rounded-full overflow-hidden bg-gray-200">
            <span className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-blue-600"></span>
          </div>
        </div>
        <Menus.Toggle id={id} />
        <Menus.Menu id={id}>
          <Menus.List>
            <Menus.Button
              onClick={() => {
                navigate(id);
              }}
            >
              <Eye size={18} /> Ver Detalhes
            </Menus.Button>

            <Modal.Open id={`edit-project-${id}`}>
              <Menus.Button>
                <PencilLine size={18} /> Editar
              </Menus.Button>
            </Modal.Open>

            <Modal.Open id={`delete-project-${id}`}>
              <Menus.Button danger>
                <Trash2 size={18} /> Eliminar
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
      </Table.Row>
      <Modal.Window id={`edit-project-${id}`}>
        <CreateUpdateProjectForm projectId={id} />
      </Modal.Window>
      <Modal.Window id={`delete-project-${id}`}>
        <DeleteAlert
          title="Projecto"
          description="este projecto"
          deleteId={id}
          onConfirm={remove}
          isPending={isPending}
        />
      </Modal.Window>
    </>
  );
}

export default ProjectListRow;
