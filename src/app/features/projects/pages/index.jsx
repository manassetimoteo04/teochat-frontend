import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-heading";
import { Plus } from "lucide-react";
import Table from "../../../shared/ui/table";
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
        <Table columns="5rem 1fr 1fr 1fr">
          <Table.Header>
            <span>Nome</span>
            <span>Nome</span>
            <span>Nome</span>
            <span>Nome</span>
          </Table.Header>
        </Table>
      </div>
    </div>
  );
}

export default ProjectsPage;
