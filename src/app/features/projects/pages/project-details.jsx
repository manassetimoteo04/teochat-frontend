import { Plus } from "lucide-react";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import PageHeader from "../../../shared/ui/page-heading";
import ProjectDetailsNav from "../components/project-details/project-details-nav";
import ProjectTasks from "../components/project-details/project-tasks";
import { CreateProjectTaskForm } from "../components/create-project-task-form";
import { useGetProjectById } from "../hooks/use-get-project-by-id";
import Spinner from "../../../shared/ui/Spinner";

function ProjectDetailsPage() {
  const { data, isPending } = useGetProjectById();

  if (isPending) return <Spinner />;
  return (
    <Modal>
      <PageHeader title={data.name} description={data.description}>
        <div>
          <Modal.Open id="create-project-taskform">
            <Button>
              <Plus /> Nova Tarefa
            </Button>
          </Modal.Open>
        </div>
      </PageHeader>
      <ProjectDetailsNav />
      <ProjectTasks />
      <Modal.Window id="create-project-taskform">
        <CreateProjectTaskForm />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectDetailsPage;
