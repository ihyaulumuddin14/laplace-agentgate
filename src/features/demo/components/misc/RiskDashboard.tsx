import { ChartPieDonut } from "@/shared/components/ui/ChartPieDonut";

const RiskDashboard = () => {
  return (
    <article className="w-full p-3 flex flex-col gap-2 h-full overflow-y-auto py-7 max-lg:mask-y-from-90%">
      <ChartPieDonut />
    </article>
  );
};

export default RiskDashboard;
