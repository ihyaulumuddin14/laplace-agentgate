"use client";

import { useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { Reveal } from "@/shared/components/ui/Reveal";

const videoUrl =
  "https://iaqebbgmfcphikkemjef.supabase.co/storage/v1/object/public/laplace-assets/demo.mp4";

export function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="demo-console"
      className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-110 w-155 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.20)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-350">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-purple-50 sm:text-5xl lg:text-[54px]">
              See It Working <span className="heading-gradient-text">Live</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-inter text-base leading-relaxed text-purple-100/75 sm:text-lg">
              The AgentGate Demo Console is a fully working proof of value
              product, not just marketing.
            </p>
          </header>
        </Reveal>

        <Reveal delay={140}>
          <div className="group relative mt-14 aspect-video w-full overflow-hidden rounded-3xl border border-purple-200/20 bg-surface-card/50 shadow-[0_40px_100px_-50px_rgba(129,51,241,0.7)] backdrop-blur-sm transition-colors duration-300 hover:border-purple-300/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(146,84,235,0.12)_0%,transparent_70%)]"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden">
              <video
                ref={videoRef}
                src={videoUrl}
                className="absolute inset-0 size-full object-cover"
                muted
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                preload="metadata"
              />

              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="relative z-10 grid size-16 place-items-center rounded-full border border-purple-200/25 bg-purple-500/15 text-purple-100 transition-all duration-300 group-hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                {isPlaying ? <MdPause size={26} /> : <MdPlayArrow size={28} />}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
