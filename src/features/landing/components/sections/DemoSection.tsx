import { MdPlayArrow } from "react-icons/md";
import { Reveal } from "@/shared/components/ui/Reveal";

export function DemoSection() {
  return (
    <section
      id="demo-console"
      className="relative overflow-hidden px-6 py-20 sm:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[440px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.20)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1400px]">
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
          {/* Video placeholder — the real demo recording drops in later */}
          <div className="group relative mt-14 aspect-video w-full overflow-hidden rounded-3xl border border-purple-200/20 bg-surface-card/50 shadow-[0_40px_100px_-50px_rgba(129,51,241,0.7)] backdrop-blur-sm transition-colors duration-300 hover:border-purple-300/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(146,84,235,0.12)_0%,transparent_70%)]"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-4">
              <span className="grid size-16 place-items-center rounded-full border border-purple-200/25 bg-purple-500/15 text-purple-100 transition-transform duration-300 group-hover:scale-110">
                <MdPlayArrow size={34} />
              </span>
              <span className="font-inter text-sm text-purple-100/45">
                Demo video coming soon
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
