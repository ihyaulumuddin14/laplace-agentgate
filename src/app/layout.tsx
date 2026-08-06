import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import { Footer } from "@/shared/components/layout/Footer";
import { Navbar } from "@/shared/components/layout/Navbar";
import "../shared/styles/globals.css";
import "@/shared/styles/globals.css";
import { cn } from "@/shared/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentGate — Guardrails for AI Agent Actions",
  description:
    "AgentGate is a framework-agnostic AI guardrail engine that evaluates every proposed agent action before it is executed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        poppins.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-surface">
        <Navbar />
        { children }
      </body>
    </html>
  );
}
