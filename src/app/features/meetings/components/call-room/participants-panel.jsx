import { useMemo, useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { hasAudio, hasVideo } from "@stream-io/video-client";
import { Camera, CameraOff, Mic, MicOff, Search, Users } from "lucide-react";

function normalizeText(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getInitials(name) {
  const source = (name || "").trim();
  if (!source) return "?";

  const parts = source.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || "";
  return `${first}${second}`.toUpperCase();
}

export function ParticipantsPanel({ currentUser }) {
  const [query, setQuery] = useState("");
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const normalizedQuery = normalizeText(query);

  const filteredParticipants = useMemo(() => {
    if (!normalizedQuery) return participants;

    return participants.filter((participant) => {
      const name = participant.name || participant.userId || "";
      return normalizeText(name).includes(normalizedQuery);
    });
  }, [normalizedQuery, participants]);

  return (
    <div className="participants-panel h-full min-h-0 flex flex-col">
      <div className="participants-panel__header">
        <p className="participants-panel__title">
          <Users size={14} /> Participantes [{participants.length}]
        </p>

        <div className="participants-panel__search">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar participante"
            aria-label="Pesquisar participante"
          />
        </div>
      </div>

      <div className="participants-panel__list">
        {filteredParticipants.length === 0 && (
          <div className="participants-panel__empty">
            <Users size={18} />
            <p>Nenhum participante encontrado.</p>
          </div>
        )}

        {filteredParticipants.map((participant) => {
          const isMe =
            participant.isLocalParticipant || participant.userId === currentUser?.id;
          const displayName = participant.name || participant.userId || "Participante";
          const isAudioOn = hasAudio(participant);
          const isVideoOn = hasVideo(participant);

          return (
            <div key={participant.sessionId || participant.userId} className="participant-item">
              <div className="participant-item__identity">
                {participant.image ? (
                  <img
                    src={participant.image}
                    alt={displayName}
                    className="participant-item__avatar"
                  />
                ) : (
                  <div className="participant-item__avatar participant-item__avatar--fallback">
                    {getInitials(displayName)}
                  </div>
                )}

                <div className="participant-item__meta">
                  <p title={displayName}>{displayName}</p>
                  {isMe && <span>Você</span>}
                </div>
              </div>

              <div className="participant-item__status">
                <span
                  className={isAudioOn ? "is-on" : "is-off"}
                  title={isAudioOn ? "Microfone ligado" : "Microfone desligado"}
                >
                  {isAudioOn ? <Mic size={13} /> : <MicOff size={13} />}
                </span>
                <span
                  className={isVideoOn ? "is-on" : "is-off"}
                  title={isVideoOn ? "Câmera ligada" : "Câmera desligada"}
                >
                  {isVideoOn ? <Camera size={13} /> : <CameraOff size={13} />}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
