import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-heading";
import { Plus } from "lucide-react";
import Table from "../../../shared/ui/table";
import ProjectsList from "../components/projects-list";
function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projectos"
        description="Visualise os projectos da tua equipa"
      >
        <div>
          <Button>
            {" "}
            <Plus /> Criar Projecto
          </Button>
        </div>
      </PageHeader>
      <div className="p-[2rem]">
        <ProjectsList />
      </div>
    </div>
  );
}

export default ProjectsPage;
