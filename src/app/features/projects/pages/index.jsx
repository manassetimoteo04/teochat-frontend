import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-heading";
import { Plus } from "lucide-react";
import Table from "../../../shared/ui/table";
import ProjectsList from "../components/projects-list";
import Modal from "../../../shared/ui/modal";
import CreateUpdateProjectForm from "../components/create-update-project-form";
function ProjectsPage() {
  return (
    <Modal>
      <PageHeader
        title="Projectos"
        description="Visualise os projectos da tua equipa"
      >
        <div>
          <Modal.Open id="create-project-form">
            <Button>
              {" "}
              <Plus /> Criar Projecto
            </Button>
          </Modal.Open>
        </div>
      </PageHeader>
      <div className="p-[2rem]">
        <ProjectsList />
      </div>
      <Modal.Window id="create-project-form">
        <CreateUpdateProjectForm />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectsPage;
