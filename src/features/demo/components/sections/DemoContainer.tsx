import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import DemoCard from "../misc/DemoCard";

const DemoContainer = () => {
  return (
    <section className="w-full h-[calc(100vh-120px)] relative mt-30 p-7 pt-0">
      <ResizablePanelGroup orientation="horizontal" className="gap-4 h-full">
        <ResizablePanel defaultSize={"24%"} minSize={300}>
          <DemoCard>
            <p>Scenario Web Chat</p>
          </DemoCard>
        </ResizablePanel>
        <ResizablePanel defaultSize={"38%"} minSize={300}>
          <DemoCard>
            <p>Action Plan State</p>
          </DemoCard>
        </ResizablePanel>
        <ResizablePanel defaultSize={"38%"} minSize={300}>
          <DemoCard>
            <p>Report</p>
          </DemoCard>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default DemoContainer;
