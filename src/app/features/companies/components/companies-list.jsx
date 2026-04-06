import { Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../../shared/ui/button";
import Spinner from "../../../shared/ui/Spinner";
import CompanyBox from "../ui/company-box";
import { useCompanies } from "../hooks/use-companies";
import { useNavigate } from "react-router-dom";

function CompaniesList() {
  const navigate = useNavigate();
  const { data: companies = [], isPending } = useCompanies();
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("all");

  const filteredCompanies = useMemo(() => {
    if (!query.trim()) return companies;
    const lower = query.toLowerCase();
    return companies.filter(({ company }) => {
      const name = company?.name?.toLowerCase() || "";
      const description = company?.description?.toLowerCase() || "";
      return name.includes(lower) || description.includes(lower);
    });
  }, [companies, query]);

  const pinnedCompanies = filteredCompanies.slice(0, 2);
  const remainingCompanies = filteredCompanies.slice(2);
  const recentCompanies = useMemo(() => {
    return filteredCompanies.filter(({ joined }) => {
      if (!joined) return false;
      const joinedAt = new Date(joined);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinedAt > thirtyDaysAgo;
    });
  }, [filteredCompanies]);
  const recentlyJoinedCount = recentCompanies.length;
  const displayedCompanies =
    activeSection === "recent"
      ? recentCompanies
      : activeSection === "pinned"
        ? pinnedCompanies
        : remainingCompanies;
  const isEmptyState =
    activeSection === "all"
      ? filteredCompanies.length === 0
      : displayedCompanies.length === 0;

  if (isPending) return <Spinner />;
  return (
    <div className="max-w-[120rem] mt-[8rem] m-[0_auto] px-[1.6rem] md:px-[3.2rem] pb-[6rem]">
      <section className="rounded-[1.6rem] border border-main-border-color bg-main-bg-color-2 shadow-[0_8px_24px_rgba(15,23,42,0.06)] overflow-hidden">
        <div className="px-[2.4rem] md:px-[3.2rem] pt-[2.4rem] pb-[2rem] border-b border-main-border-color bg-white">
          <div className="flex flex-col gap-[1.2rem] md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-[2.6rem] md:text-[3rem] font-semibold">
                Workspaces
              </h3>
              <p className="text-[1.5rem] text-secondary-text-color max-w-[44rem]">
                Acesse rapidamente suas empresas, mantenha o foco e organize seu
                trabalho em um só lugar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variation="secondary"
                className="w-auto px-5"
                onClick={() => setActiveSection("recent")}
              >
                Recentes
              </Button>
              <Button
                className="w-auto px-6"
                onClick={() => navigate("create")}
              >
                <Plus />
                Criar Workspace
              </Button>
            </div>
          </div>
          <div className="grid gap-[1rem] mt-[2rem] md:grid-cols-3">
            <div className="rounded-xl border border-main-border-color bg-main-bg-color px-[1.4rem] py-[1.2rem]">
              <p className="text-[1.2rem] text-secondary-text-color">Total</p>
              <p className="text-[2.2rem] font-semibold">{companies.length}</p>
              <p className="text-[1.2rem] text-secondary-text-color">
                Workspaces ativos
              </p>
            </div>
            <div className="rounded-xl border border-main-border-color bg-main-bg-color px-[1.4rem] py-[1.2rem]">
              <p className="text-[1.2rem] text-secondary-text-color">
                Últimos 30 dias
              </p>
              <p className="text-[2.2rem] font-semibold">
                {recentlyJoinedCount}
              </p>
              <p className="text-[1.2rem] text-secondary-text-color">
                Novas entradas
              </p>
            </div>
            <div className="rounded-xl border border-main-border-color bg-main-bg-color px-[1.4rem] py-[1.2rem]">
              <p className="text-[1.2rem] text-secondary-text-color">
                Resultado
              </p>
              <p className="text-[2.2rem] font-semibold">
                {filteredCompanies.length}
              </p>
              <p className="text-[1.2rem] text-secondary-text-color">
                Workspaces encontrados
              </p>
            </div>
          </div>
        </div>

        <div className="px-[2.4rem] md:px-[3.2rem] py-[1.6rem] border-b border-main-border-color flex flex-col gap-[1.2rem]">
          <div className="flex flex-col gap-[1rem] md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-xl border border-main-border-color bg-white px-[1.2rem] py-[0.8rem] w-full md:max-w-[34rem]">
              <Search size={18} className="text-secondary-text-color" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome ou descrição"
                className="w-full bg-transparent text-[1.4rem] focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {[
                { id: "all", label: "Todas" },
                { id: "pinned", label: "Fixadas" },
                { id: "recent", label: "Recentes" },
              ].map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-full border text-[1.3rem] font-medium transition ${
                    activeSection === section.id
                      ? "border-green-500 text-green-700 bg-green-50"
                      : "border-main-border-color text-secondary-text-color bg-white hover:text-main-text-color"
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <Button variation="secondary" className="w-auto px-4">
                <Filter size={16} /> Filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="px-[2.4rem] md:px-[3.2rem] py-[2.4rem]">
          {activeSection === "all" && (
            <section>
              <div className="flex items-center justify-between mb-[1.6rem]">
                <div>
                  <h4 className="text-[1.8rem] font-semibold">Fixadas</h4>
                  <p className="text-[1.3rem] text-secondary-text-color">
                    Workspaces com foco imediato.
                  </p>
                </div>
              </div>
              <div className="grid gap-[1.6rem] md:grid-cols-2">
                {pinnedCompanies.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-main-border-color p-[2rem] text-secondary-text-color">
                    Nenhuma empresa fixada ainda.
                  </div>
                ) : (
                  pinnedCompanies.map((company) => (
                    <CompanyBox company={company} key={company.company?.id} />
                  ))
                )}
              </div>
            </section>
          )}

          <section className="mt-[3.2rem]">
            <div className="flex items-center justify-between mb-[1.6rem]">
              <div>
                <h4 className="text-[1.8rem] font-semibold">
                  {activeSection === "recent"
                    ? "Entradas recentes"
                    : activeSection === "pinned"
                      ? "Fixadas"
                      : "Todas"}
                </h4>
                <p className="text-[1.3rem] text-secondary-text-color">
                  Organize e escolha o workspace ideal para trabalhar.
                </p>
              </div>
            </div>
            <div className="grid gap-[1.6rem] sm:grid-cols-2 lg:grid-cols-3">
              {displayedCompanies.map((company) => (
                <CompanyBox company={company} key={company.company?.id} />
              ))}
              {isEmptyState && (
                <div className="rounded-xl border border-dashed border-main-border-color p-[2rem] text-secondary-text-color">
                  Nenhuma empresa encontrada. Ajuste sua busca ou crie uma nova.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default CompaniesList;
