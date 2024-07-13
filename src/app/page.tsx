import { IMAGES } from "@/components/images/constants";
import { FloatingImage } from "@/components/images/FloatingImage";
import { InflowsChart } from "@/components/ui/inflows-chart";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-2 justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="w-full relative flex flec-col item-center justify-center" >
      <div className="max-w-2xl">
        <p className="text-lg">
          <span className="font-bold" >Curious about how Axie Infinity&apos;s treasury is doing? </span><br/>
           This chart tells the story of our growing revenue since March 29, 2022!
        </p>

        <p className="my-4 text-lg pb-2">
          See how the inflows comes in from activities like breeding, minting, and marketplace sales by clicking on the chart below.
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <RevenueChart />
          <FloatingImage src={IMAGES.ROCKET} top="top-[395px]" left="left-[240px]" width={89*1.5} height={100*1.5} />
          <FloatingImage src={IMAGES.CYLINDER} top="top-[390px]" left="left-[210px]" width={209/7} height={200/7} />
          <FloatingImage src={IMAGES.CUBE} top="top-[490px]" left="left-[390px]" width={209/7} height={200/7} />
          <FloatingImage src={IMAGES.HALF_SPHERE} top="top-[490px]" left="left-[190px]" width={209/7} height={200/7} />

          
          <FloatingImage src={IMAGES.SEARCHING} top="top-[205px]" left="right-[230px]" width={89*1.5} height={100*1.5} />
          <FloatingImage src={IMAGES.CYLINDER} top="top-[200px]" left="right-[200px]" width={209/7} height={200/7} />
          <FloatingImage src={IMAGES.CUBE} top="top-[300px]" left="right-[380px]" width={209/7} height={200/7} />
          <FloatingImage src={IMAGES.HALF_SPHERE} top="top-[300px]" left="right-[180px]" width={209/7} height={200/7} />
          {/* idea: show this chart when click on some day inside the revenuechart */}
          {/* <InflowsChart /> */}
        </Suspense>
      </div>
      
      </div>
    </main>
  );
}
