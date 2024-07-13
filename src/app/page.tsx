import { BarChatExample1 } from "@/components/ui/bar-chart";
import { InflowsChart } from "@/components/ui/inflows-chart";
import { ListPricesInfos } from "@/components/ui/list-prices-infos";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { Suspense } from "react";
import { ZoomableChart } from "@/components/ui/line-chat-with-zoom";
import { FloatingImages } from "@/components/ui/floating-images";

const Home = () => {
  return (
    <main
      className="flex flex-col items-center p-2 justify-center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="w-full relative flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg">
            <span className="font-bold">
              Curious about how Axie Infinity&apos;s treasury is doing?{" "}
            </span>
            <br />
            This chart tells the story of our growing revenue since March 29,
            2022!
          </p>

          <p className="my-4 text-lg pb-2">
            See how the inflows comes in from activities like breeding, minting,
            and marketplace sales by clicking on the chart below.
          </p>

          <div className="bg-gray-800 py-5 lg:py-15 mb-5" id="kt_toolbar">
            <div
              id="kt_toolbar_container"
              className="container mx-auto flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h1 className="text-white font-bold text-3xl my-1">
                  Axie Infinity Treasury
                </h1>
              </div>
              <div className="flex items-center py-1">
                <div className="mr-4">
                  <a
                    href="https://blog.axieinfinity.com/p/axiegov-data-hackathon"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300"
                  >
                    Visit Axie Infinity Blog
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-2">Key Highlights</h3>
                <ul className="list-disc pl-5">
                  <li>Total Revenue: $X million</li>
                  <li>Year-over-Year Growth: X%</li>
                  <li>Top Revenue Source: Marketplace Sales</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-2">Recent Developments</h3>
                <ul className="list-disc pl-5">
                  <li>New breeding mechanics introduced</li>
                  <li>Marketplace fee adjustments</li>
                  <li>Launch of new Axie types</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4 h-full">
            <div className="w-full md:w-2/4 px-2 h-full  mb-4 md:mb-0">
              <InflowsChart />
            </div>
            <div className="w-full md:w-2/4 px-2 h-full">
              <BarChatExample1 />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 h-full">
              <ListPricesInfos />
            </div>
          </div>

          <div className="w-full rounded-lg shadow mb-4">
            <Suspense fallback={<div>Loading...</div>}>
              <RevenueChart />
              <FloatingImages />
            </Suspense>
          </div>
          <div className="w-full rounded-lg shadow mb-4">
            <Suspense fallback={<div>Loading...</div>}>
              <ZoomableChart />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
