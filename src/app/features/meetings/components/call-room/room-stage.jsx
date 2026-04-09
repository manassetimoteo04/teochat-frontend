import { useMemo } from "react";
import clsx from "clsx";
import { MonitorUp, Users } from "lucide-react";
import { ParticipantView } from "@stream-io/video-react-sdk";
import { hasScreenShare } from "@stream-io/video-client";

function getParticipantKey(participant) {
  return participant?.sessionId || participant?.userId || participant?.session_id;
}

function dedupeParticipants(participants = []) {
  const map = new Map();

  participants.forEach((participant) => {
    const key = getParticipantKey(participant);
    if (!key || map.has(key)) return;
    map.set(key, participant);
  });

  return Array.from(map.values());
}

function getParticipantLabel(participant) {
  if (participant?.isLocalParticipant) return "Você";

  return participant?.name || participant?.user?.name || participant?.userId || "Participante";
}

function sortParticipants(participants = []) {
  return [...participants].sort((a, b) => {
    if (hasScreenShare(a) && !hasScreenShare(b)) return -1;
    if (!hasScreenShare(a) && hasScreenShare(b)) return 1;
    if (a?.isDominantSpeaker && !b?.isDominantSpeaker) return -1;
    if (!a?.isDominantSpeaker && b?.isDominantSpeaker) return 1;
    if (a?.isSpeaking && !b?.isSpeaking) return -1;
    if (!a?.isSpeaking && b?.isSpeaking) return 1;
    if (a?.isLocalParticipant && !b?.isLocalParticipant) return 1;
    if (!a?.isLocalParticipant && b?.isLocalParticipant) return -1;
    return 0;
  });
}

function StageTile({
  participant,
  className,
  isScreenShare = false,
  compact = false,
}) {
  return (
    <div
      className={clsx(
        "room-stage-tile relative h-full min-h-0 overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900",
        isScreenShare && "room-stage-tile--screen-share",
        participant?.isSpeaking && "ring-1 ring-main-color/60",
        compact ? "min-h-[11rem]" : "min-h-[20rem]",
        className,
      )}
    >
      <ParticipantView
        participant={participant}
        trackType={isScreenShare ? "screenShareTrack" : "videoTrack"}
        ParticipantViewUI={null}
        className="h-full"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-[0.8rem] bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-[1rem]">
        <div className="min-w-0">
          <p className="truncate text-[1.25rem] font-medium text-white">
            {getParticipantLabel(participant)}
          </p>
          <p className="mt-[0.2rem] text-[1.1rem] text-zinc-300">
            {isScreenShare
              ? "A apresentar"
              : participant?.isLocalParticipant
                ? "Você"
                : participant?.isDominantSpeaker
                  ? "Em destaque"
                  : participant?.isSpeaking
                    ? "A falar"
                    : "Na chamada"}
          </p>
        </div>

        {isScreenShare && (
          <span className="inline-flex shrink-0 items-center gap-[0.4rem] rounded-full border border-white/10 bg-black/30 px-[0.8rem] py-[0.35rem] text-[1.05rem] text-zinc-100">
            <MonitorUp size={13} />
            Partilha
          </span>
        )}
      </div>
    </div>
  );
}

function StageEmptyState() {
  return (
    <div className="flex h-full min-h-[32rem] flex-col items-center justify-center gap-[1rem] rounded-[2rem] border border-dashed border-white/10 bg-slate-900/40 text-center text-zinc-300">
      <Users size={24} />
      <div>
        <p className="text-[1.5rem] font-medium text-white">A preparar a chamada</p>
        <p className="mt-[0.35rem] text-[1.2rem] text-zinc-400">
          A câmara e os participantes vão aparecer aqui assim que a ligação estiver pronta.
        </p>
      </div>
    </div>
  );
}

export default function RoomStage({ participants = [], localParticipant, layout }) {
  const stageParticipants = useMemo(() => {
    const merged = dedupeParticipants(
      participants.length > 0 ? participants : localParticipant ? [localParticipant] : [],
    );

    return sortParticipants(merged);
  }, [localParticipant, participants]);

  const screenShareParticipant = useMemo(
    () => stageParticipants.find((participant) => hasScreenShare(participant)),
    [stageParticipants],
  );

  const featuredParticipant = useMemo(() => {
    if (screenShareParticipant) return screenShareParticipant;
    return stageParticipants[0] || null;
  }, [screenShareParticipant, stageParticipants]);

  const secondaryParticipants = useMemo(() => {
    if (!featuredParticipant) return [];

    return stageParticipants.filter(
      (participant) => getParticipantKey(participant) !== getParticipantKey(featuredParticipant),
    );
  }, [featuredParticipant, stageParticipants]);

  if (!stageParticipants.length) {
    return <StageEmptyState />;
  }

  if (screenShareParticipant) {
    return (
      <section className="grid h-full min-h-0 gap-[0.8rem] lg:grid-cols-[minmax(0,1fr)_24rem]">
        <StageTile
          participant={screenShareParticipant}
          isScreenShare
          className="min-h-[30rem] lg:min-h-0"
        />

        <div className="flex min-h-0 gap-[0.8rem] overflow-x-auto lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
          {stageParticipants.map((participant) => (
            <StageTile
              key={getParticipantKey(participant)}
              participant={participant}
              isScreenShare={hasScreenShare(participant)}
              compact
              className="h-[12rem] min-w-[16rem] lg:h-[14rem] lg:min-w-0"
            />
          ))}
        </div>
      </section>
    );
  }

  if (layout === "grid") {
    const gridClassName =
      stageParticipants.length === 1
        ? "grid-cols-1"
        : stageParticipants.length === 2
          ? "grid-cols-1 lg:grid-cols-2"
          : stageParticipants.length <= 4
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

    return (
      <section className={clsx("grid h-full min-h-0 gap-[0.8rem]", gridClassName)}>
        {stageParticipants.map((participant) => (
          <StageTile
            key={getParticipantKey(participant)}
            participant={participant}
            className={clsx(
              stageParticipants.length === 1 && "min-h-[36rem]",
              stageParticipants.length === 2 && "min-h-[24rem] lg:min-h-0",
              stageParticipants.length > 2 && "min-h-[20rem]",
            )}
          />
        ))}
      </section>
    );
  }

  if (stageParticipants.length <= 2) {
    return (
      <section className="grid h-full min-h-0 gap-[0.8rem] xl:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)]">
        <StageTile
          participant={stageParticipants[0]}
          className="min-h-[26rem] xl:min-h-0"
        />

        {stageParticipants[1] ? (
          <StageTile
            participant={stageParticipants[1]}
            compact
            className="min-h-[18rem] xl:min-h-0"
          />
        ) : null}
      </section>
    );
  }

  return (
    <section className="grid h-full min-h-0 gap-[0.8rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
      <StageTile participant={featuredParticipant} className="min-h-[28rem] xl:min-h-0" />

      <div className="flex min-h-0 gap-[0.8rem] overflow-x-auto xl:flex-col xl:overflow-y-auto xl:overflow-x-hidden">
        {secondaryParticipants.map((participant) => (
          <StageTile
            key={getParticipantKey(participant)}
            participant={participant}
            compact
            className="h-[12rem] min-w-[16rem] xl:h-[14rem] xl:min-w-0"
          />
        ))}
      </div>
    </section>
  );
}
