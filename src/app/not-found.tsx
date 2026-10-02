import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { GuardedLink } from "@/shared/components/ui/GuardedLink";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 pt-24">
      <div
        aria-hidden="true"
        className="absolute size-125 rounded-full bg-purple-500/20 blur-3xl"
      />
      <section className="relative flex max-w-md flex-col items-center rounded-3xl border border-purple-200/15 bg-surface-card/80 px-8 py-10 text-center shadow-[0_20px_60px_-20px_rgba(92,0,225,0.65)] backdrop-blur sm:px-12">
        <h1 className="text-4xl font-semibold tracking-tight text-purple-50 sm:text-5xl">
          Whoops..
        </h1>
        <p className="mt-4 text-sm leading-6 text-purple-100/70 sm:text-base">
          Sorry, the page you were looking for doesn't exist
        </p>
        <Button asChild className="mt-8" size="sm">
          <GuardedLink href="/home">
            <ArrowLeft />
            Back to home
          </GuardedLink>
        </Button>
      </section>
    </main>
  );
}
