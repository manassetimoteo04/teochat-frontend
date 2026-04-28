import Heading from "../../../shared/ui/heading";
import clsx from "clsx";

function SettingsPanel({
  title,
  description,
  children,
  className,
  actions,
  contentClassName,
}) {
  return (
    <section
      className={clsx(
        "rounded-3xl border border-gray-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      <header className="flex flex-col gap-[1rem] border-b border-gray-100 px-[2rem] py-[1.8rem] md:flex-row md:items-start md:justify-between">
        <div>
          <Heading>{title}</Heading>
          {description && (
            <p className="mt-[0.4rem] max-w-[60rem] text-[1.4rem] text-secondary-text-color">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-[1rem]">{actions}</div>}
      </header>
      <div className={clsx("p-[2rem]", contentClassName)}>{children}</div>
    </section>
  );
}

export default SettingsPanel;
