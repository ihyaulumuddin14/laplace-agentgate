import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import ChatSection from "../sections/ChatSection";
import LogsSection from "../sections/LogsSection";
import StateSection from "../sections/StateSection";
import DemoCard from "./DemoCard";

export default function DesktopDemoContainer() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="hidden! lg:flex! gap-4 h-full"
    >
      <ResizablePanel defaultSize={"24%"} minSize={300}>
        <DemoCard>
          <ChatSection />
        </DemoCard>
      </ResizablePanel>
      <ResizablePanel defaultSize={"38%"} minSize={300}>
        <DemoCard>
          <StateSection />
        </DemoCard>
      </ResizablePanel>
      <ResizablePanel defaultSize={"38%"} minSize={300}>
        <DemoCard>
          <LogsSection />
        </DemoCard>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
