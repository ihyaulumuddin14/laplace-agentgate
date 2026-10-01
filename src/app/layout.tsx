import AgentGateSessionProvider from "@/shared/components/layout/AgentGateSessionProvider";
import { Navbar } from "@/shared/components/layout/Navbar";
import QueryProvider from "@/shared/components/layout/QueryProvider";
import { SessionObserver } from "@/shared/components/SessionObserver";
import { cn } from "@/shared/lib/utils";
import "@/shared/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "../shared/styles/globals.css";

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
  title: {
    default: "AgentGate | Guardrails for AI Agent Actions",
    template: "%s | AgentGate",
  },
  description:
    "AgentGate is a framework-agnostic guardrail engine that evaluates AI agent tool actions before they reach APIs, browsers, files, or other external systems.",
  applicationName: "AgentGate",
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
        <QueryProvider>
          <AgentGateSessionProvider>
            <SessionObserver />
            <Navbar />
            {children}
          </AgentGateSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
