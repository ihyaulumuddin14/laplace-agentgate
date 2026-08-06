import DesktopDemoContainer from "../misc/DesktopDemoContainer";
import MobileDemoContainer from "../misc/MobileDemoContainer";

const DemoContainer = () => {
  return (
    <section className="w-full h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] relative mt-25 lg:mt-30 lg:p-7 pt-0">
      <DesktopDemoContainer />
      <MobileDemoContainer />
    </section>
  );
};

export default DemoContainer;
