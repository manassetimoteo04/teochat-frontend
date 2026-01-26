function StepForm({ step, children }) {
  const { title } = step;
  return (
    <div className="flex flex-col gap-[2rem]">
      <h3 className="text-[2.4rem]">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default StepForm;
