function ResourceNotFound({ error }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white p-[2rem] border border-main-border-color rounded-2xl">
        <span className="text-[2.8rem]">404</span>
        <h1 className="text-red-600">{error}</h1>
        <p className="text-secondary-text-color">
          Não conseguimos encontrar nenhum recurso com este id
        </p>
      </div>
    </div>
  );
}

export default ResourceNotFound;
