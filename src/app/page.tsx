import { InflowsChart } from "@/components/ui/inflows-chart";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold">Axie Treasury Chart</h1>

        <p className="mt-4 text-lg">
          Curious about how Axie Infinity&apos;s treasury is doing? This chart tells the story of our growing revenue since March 29, 2022!
        </p>

        <p className="my-4 text-lg">
          See how the inflows comes in from activities like breeding, minting, and marketplace sales by clicking on the chart below.
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <RevenueChart />
          {/* idea: show this chart when click on some day inside the revenuechart */}
          {/* <InflowsChart /> */}
        </Suspense>
      </div>
    </main>
  );
}
