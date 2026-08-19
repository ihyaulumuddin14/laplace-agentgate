import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import ChatSection from "../sections/ChatSection";
import InsightSection from "../sections/LogsSection";
import ActionSection from "../sections/StateSection";
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
          <ActionSection />
        </DemoCard>
      </ResizablePanel>
      <ResizablePanel defaultSize={"38%"} minSize={300}>
        <DemoCard>
          <InsightSection />
        </DemoCard>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
