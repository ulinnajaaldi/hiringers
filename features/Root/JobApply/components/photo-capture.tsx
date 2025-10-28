"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  FilesetResolver,
  HandLandmarker,
  type HandLandmarkerResult,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const countExtendedFingers = (landmarks: NormalizedLandmark[]) => {
  let count = 0;
  const wrist = landmarks[0];
  const thumbTip = landmarks[4];
  const thumbMCP = landmarks[2];
  const thumbExtended =
    Math.abs(thumbTip.x - wrist.x) > Math.abs(thumbMCP.x - wrist.x) * 1.3;
  if (thumbExtended) count++;
  const fingerTips = [8, 12, 16, 20];
  const fingerPIPs = [6, 10, 14, 18];
  for (let i = 0; i < fingerTips.length; i++) {
    const tipY = landmarks[fingerTips[i]].y;
    const pipY = landmarks[fingerPIPs[i]].y;
    const wristY = wrist.y;
    if (tipY < pipY && tipY < wristY - 0.05) count++;
  }
  return count;
};

interface PhotoCaptureProps {
  onPhotoCapture: (photoDataUrl: string) => void;
}

export default function PhotoCapture({ onPhotoCapture }: PhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const frameReqRef = useRef<number | null>(null);
  const stopRef = useRef(false);

  const isCountingDownRef = useRef(false);
  const isCapturingRef = useRef(false);
  const lastSequenceCompleteAtRef = useRef(0);
  const countdownStartAtRef = useRef<number | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const sequenceRef = useRef({
    sequence: [3, 2, 1],
    currentIndex: 0,
    detectionStartTime: 0,
    holdDuration: 500,
    lastFingerCount: -1,
  });
  const SEQUENCE_COOLDOWN_MS = 800;

  const resetSequence = () => {
    const s = sequenceRef.current;
    s.currentIndex = 0;
    s.detectionStartTime = 0;
    s.lastFingerCount = -1;
  };

  const capturePhoto = useCallback(() => {
    if (isCapturingRef.current) return;
    isCapturingRef.current = true;

    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const ctx = canvas.getContext("2d")!;

    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    const imageData = canvas.toDataURL("image/jpeg", 0.9);

    stopRef.current = true;
    if (frameReqRef.current) {
      cancelAnimationFrame(frameReqRef.current);
      frameReqRef.current = null;
    }

    if (video.srcObject) {
      (video.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      video.srcObject = null;
    }

    onPhotoCapture(imageData);
    setActiveStepIndex(-1);

    requestAnimationFrame(() => {
      setActiveStepIndex(-1);
      isCapturingRef.current = false;
    });
  }, [onPhotoCapture]);

  const startCountdown = useCallback(() => {
    if (isCountingDownRef.current) return;
    isCountingDownRef.current = true;
    setCountdown(3);
    countdownStartAtRef.current = performance.now();

    const tick = (t: number) => {
      if (!isCountingDownRef.current) return;
      const elapsed = t - (countdownStartAtRef.current ?? t);
      const left = 3 - Math.floor(elapsed / 1000);
      if (left <= 0) {
        setCountdown(null);
        isCountingDownRef.current = false;
        capturePhoto();
        return;
      }
      setCountdown(left);
      frameReqRef.current = requestAnimationFrame(tick);
    };
    frameReqRef.current = requestAnimationFrame(tick);
  }, [capturePhoto]);

  const handleResults = useCallback(
    (res: HandLandmarkerResult) => {
      if (!res.landmarks?.length) {
        if (sequenceRef.current.currentIndex > 0) {
          const s = sequenceRef.current;
          s.currentIndex = 0;
          s.detectionStartTime = 0;
          s.lastFingerCount = -1;
          setActiveStepIndex(0);
        }
        return;
      }

      const landmarks = res.landmarks[0];
      const fingerCount = countExtendedFingers(landmarks);

      const seq = sequenceRef.current;
      const expected = seq.sequence[seq.currentIndex];
      const now = performance.now();

      if (fingerCount === expected && seq.lastFingerCount !== expected) {
        seq.detectionStartTime = now;
      }

      if (
        fingerCount === expected &&
        now - seq.detectionStartTime >= seq.holdDuration
      ) {
        seq.currentIndex++;
        setActiveStepIndex(seq.currentIndex);

        if (seq.currentIndex === seq.sequence.length) {
          const ok =
            !isCountingDownRef.current &&
            now - lastSequenceCompleteAtRef.current > SEQUENCE_COOLDOWN_MS;
          if (ok) {
            startCountdown();
            lastSequenceCompleteAtRef.current = now;
          }
          resetSequence();
        } else {
          seq.detectionStartTime = 0;
        }
      }

      seq.lastFingerCount = fingerCount;
    },
    [startCountdown],
  );

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
          audio: false,
        });
        const video = videoRef.current!;
        video.srcObject = stream;
        await new Promise((r) => (video.onloadedmetadata = () => r(null)));
        await video.play();

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const V = "0.10.10";

        const fileset = await FilesetResolver.forVisionTasks(
          `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${V}/wasm`,
        );

        const landmarker = await HandLandmarker.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: "/models/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.7,
          minHandPresenceConfidence: 0.7,
          minTrackingConfidence: 0.7,
        });

        if (!mounted) return;
        landmarkerRef.current = landmarker;

        stopRef.current = false;
        const hasRVFC =
          "requestVideoFrameCallback" in HTMLVideoElement.prototype;

        let lastTimestamp = 0;

        if (hasRVFC) {
          const rvfc = (video as any).requestVideoFrameCallback.bind(video);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const step = (_now: number, _metadata?: { mediaTime?: number }) => {
            if (stopRef.current || !videoRef.current) return;
            try {
              const currentTimestamp = Math.max(
                lastTimestamp + 1,
                performance.now(),
              );
              lastTimestamp = currentTimestamp;

              const res = landmarker.detectForVideo(video, currentTimestamp);
              handleResults(res);
            } catch (error) {
              console.error("Detection error:", error);
            }
            if (!stopRef.current) {
              rvfc(step);
            }
          };
          rvfc(step);
        } else {
          const stepRAF = () => {
            if (stopRef.current || !videoRef.current) return;
            try {
              const currentTimestamp = Math.max(
                lastTimestamp + 1,
                performance.now(),
              );
              lastTimestamp = currentTimestamp;

              const res = landmarker.detectForVideo(video, currentTimestamp);
              handleResults(res);
            } catch (error) {
              console.error("Detection error:", error);
            }
            if (!stopRef.current) {
              frameReqRef.current = requestAnimationFrame(stepRAF);
            }
          };
          frameReqRef.current = requestAnimationFrame(stepRAF);
        }
      } catch (e: any) {
        console.log("Camera initialization error:", e);
      }
    };

    init();

    return () => {
      mounted = false;
      stopRef.current = true;
      if (frameReqRef.current) cancelAnimationFrame(frameReqRef.current);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const v = videoRef.current;
      if (v?.srcObject) {
        (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
        v.srcObject = null;
      }
    };
  }, [handleResults]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-auto w-full max-w-3xl scale-x-[-1]"
        />
        <canvas ref={canvasRef} className="hidden" />

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-pulse text-9xl font-bold text-white">
              {countdown}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-s text-neutral-100">
          To take a picture, follow the hand poses in the order shown below. The
          system will automatically capture the image once the final pose is
          detected.
        </p>
        <div className="flex items-center justify-center gap-1">
          <div
            className={cn(
              "relative h-[58px] w-[58px] border-2 transition-colors",
              activeStepIndex === 0 ? "border-primary" : "border-transparent",
            )}
          >
            <Image
              src="/images/count_3.png"
              alt="Show 3 fingers"
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
          <ChevronRight className="size-6" />
          <div
            className={cn(
              "relative h-[58px] w-[58px] border-2 transition-colors",
              activeStepIndex === 1 ? "border-primary" : "border-transparent",
            )}
          >
            <Image
              src="/images/count_2.png"
              alt="Show 2 fingers"
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
          <ChevronRight className="size-6" />
          <div
            className={cn(
              "relative h-[58px] w-[58px] border-2 transition-colors",
              activeStepIndex === 2 ? "border-primary" : "border-transparent",
            )}
          >
            <Image
              src="/images/count_1.png"
              alt="Show 1 fingers"
              width={240}
              height={240}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
