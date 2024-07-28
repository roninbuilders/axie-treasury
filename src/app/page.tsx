import { RevenueChart } from '@/components/ui/revenue-chart'
import { Suspense } from 'react'
import { ZoomableChart } from '@/components/ui/line-chat-with-zoom'
import { FloatingImages } from '@/components/ui/floating-images'

const Home = () => {
	return (
		<main className="flex flex-col items-center p-2 justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
			<div className="w-full relative flex flex-col items-center justify-center">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-lg my-4">
						<span className="font-bold">Curious about how Axie Infinity&apos;s treasury is doing? </span>
						<br />
						This charts tells the revenues story since March 29, 2022!
					</p>

					{/* <p className="my-4 text-lg pb-2">
						See how the inflows comes in from activities like breeding, minting, and marketplace sales by clicking on
						the chart below.
					</p> */}

					<div className="bg-gray-800 py-5 lg:py-15 mb-5" id="kt_toolbar">
						<div id="kt_toolbar_container" className="container mx-auto flex justify-between items-center">
							<div className="flex flex-col">
								<h3 className="text-white font-bold text-3xl my-1">Stay up to date</h3>
							</div>
							<div className="flex items-center py-1">
								<div className="mr-4">
									<a
										href="https://blog.axieinfinity.com/"
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

					<div className="w-full rounded-lg shadow mb-4">
						<Suspense fallback={<div>Loading...</div>}>
							<RevenueChart />
							<FloatingImages />
						</Suspense>
					</div>
					{/* <div className="w-full rounded-lg shadow mb-4">
						<Suspense fallback={<div>Loading...</div>}>
							<ZoomableChart />
						</Suspense>
					</div> */}
				</div>
			</div>
		</main>
	)
}

export default Home
