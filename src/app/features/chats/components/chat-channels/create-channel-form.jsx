import { useState } from "react";
import Button from "../../../../shared/ui/button";
import { useCreateChatChannel } from "../../hooks/use-create-chat-channels";

export function CreateChannelForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateChatChannel();
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    mutate({
      name: name.trim().toLowerCase(),
      description: description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-[2rem] max-w-[40rem]">
      <h2 className="font-semibold text-[2.4rem] text-main-text-color">
        Criar Canal
      </h2>
      <div className="space-y-2">
        <label className="font-medium text-main-text-color">
          Nome do canal
        </label>
        <div className="flex items-center gap-2 border rounded-xl px-4 py-3 focus-within:border-main-color">
          <span className="text-secondary-text-color">#</span>
          <input
            type="text"
            placeholder="general"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent outline-none "
          />
        </div>
        <p className="text-sm text-secondary-text-color">
          Use nomes curtos e sem espaços
        </p>
      </div>

      <div className="space-y-2">
        <label className=" font-medium text-main-text-color">
          Descrição (opcional)
        </label>
        <textarea
          placeholder="Sobre o que é este canal?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-main-color "
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 rounded-xl  text-white  hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Criando..." : "Criar canal"}
        </Button>
      </div>
    </form>
  );
}
