import {
  HiOutlinePaperAirplane,
  HiPause,
  HiPlay,
  HiStop,
} from "react-icons/hi2";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { cloneElement } from "react";
import ButtonIcon from "./ButtonIcon";
import clsx from "clsx";
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const AudioRecorder = ({ recording, setRecording, children }) => {
  const {
    stopRecording,
    startRecording,
    audioUrl,
    waveformRef,
    wavesurferRef,
    currentTime,
    duration,
    setAudioUrl,
  } = useAudioRecorder(setRecording);

  function handleSend() {
    console.log(audioUrl);
    setAudioUrl(null);
    setRecording(false);
  }
  return (
    <>
      {cloneElement(children, {
        onClick: recording ? stopRecording : startRecording,
      })}

      {(audioUrl || recording) && (
        <div className="p-[0_3rem] absolute w-full h-full   bg-main-bg-color dark:bg-main-bg-color-dark flex items-center gap-3">
          <div
            className={`w-full flex  items-center justify-between ${
              recording ? clsx`justify-end` : ""
            }`}
          >
            <span
              className={`text-secondary-text-color absolute top-[0.4rem]
              dark:text-secondary-text-color-dark text-[1.4rem] ${
                recording ? clsx`relative` : ""
              }`}
            >
              {recording
                ? "Gravando"
                : `${formatTime(currentTime)} / ${formatTime(duration)}`}
            </span>
            {audioUrl && <div ref={waveformRef} className="w-full" />}
            <div className="flex  w-[10rem] items-center justify-between mt-2">
              {!recording && (
                <ButtonIcon onClick={() => wavesurferRef.current.playPause()}>
                  {wavesurferRef?.current?.isPlaying() ? (
                    <HiPause />
                  ) : (
                    <HiPlay />
                  )}
                </ButtonIcon>
              )}
              <div className=" flex items-center gap-[2rem]">
                {recording && (
                  <span className="block w-[2rem] h-[2rem] rounded-full animate-pulseGrow  bg-red-500"></span>
                )}
                {recording && (
                  <ButtonIcon title="Parar gravação" onClick={stopRecording}>
                    <HiStop />
                  </ButtonIcon>
                )}
                {!recording && (
                  <button
                    onClick={handleSend}
                    className="text-[2.4rem] text-black bg-main-color w-[3.5rem] rounded-full h-[3.5rem]  self-center  flex items-center  justify-center"
                  >
                    <HiOutlinePaperAirplane />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioRecorder;
