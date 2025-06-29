import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export function useAudioRecorder(setRecording) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  useEffect(() => {
    if (audioUrl && waveformRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#999",
        progressColor: "#25D366",
        height: 30,
        width: "100%",
        barWidth: 3,
        responsive: true,
      });

      wavesurferRef.current = wavesurfer;
      wavesurfer.load(audioUrl);

      wavesurfer.on("ready", () => {
        setDuration(wavesurfer.getDuration());
      });

      wavesurfer.on("audioprocess", () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      return () => wavesurfer.destroy();
    }
  }, [audioUrl]);

  return {
    stopRecording,
    startRecording,
    audioUrl,
    waveformRef,
    wavesurferRef,
    currentTime,
    duration,
    setAudioUrl,
  };
}
