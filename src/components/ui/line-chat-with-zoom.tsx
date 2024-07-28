'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Area, CartesianGrid, XAxis, YAxis, ComposedChart, ReferenceArea, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart'
import { useTreasuryHistory } from '@/api/useTreasury'

type DataPoint = {
	time: string
	totalInflows: number
}

const chartConfig = {
	totalInflows: {
		label: 'Inflows Events',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig

export function ZoomableChart() {
	const [data, setData] = useState<DataPoint[]>([])
	const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null)
	const [refAreaRight, setRefAreaRight] = useState<string | null>(null)
	const [startTime, setStartTime] = useState<string | null>(null)
	const [endTime, setEndTime] = useState<string | null>(null)
	const [originalData, setOriginalData] = useState<DataPoint[]>([])
	const [isSelecting, setIsSelecting] = useState(false)
	const [isZooming, setIsZooming] = useState(false)
	const chartRef = useRef<HTMLDivElement>(null)
		const { data: res } = useTreasuryHistory()

	useEffect(() => {
		if (!res) return
		const dataPoints = (res.data.data as DataPoint[]).map((d) => ({
			time: d.time,
			totalInflows: d.totalInflows,
		}))
		setData(dataPoints)
		setOriginalData(dataPoints)
		setStartTime(dataPoints[0].time)
		setEndTime(dataPoints[dataPoints.length - 1].time)
	}, [res])

	useEffect(() => {
		if (startTime && endTime && !isZooming) {
			const zoomedData = originalData.filter((d) => d.time >= startTime && d.time <= endTime)
			setData(zoomedData.length > 1 ? zoomedData : originalData.slice(0, 2))
		}
	}, [startTime, endTime, originalData, isZooming])

	const total = useMemo(() => data.reduce((acc, curr) => acc + curr.totalInflows, 0), [data])

	const handleMouseDown = (e: any) => {
		if (e.activeLabel) {
			setRefAreaLeft(e.activeLabel)
			setIsSelecting(true)
		}
	}

	const handleMouseMove = (e: any) => {
		if (isSelecting && e.activeLabel) {
			setRefAreaRight(e.activeLabel)
		}
	}

	const handleMouseUp = () => {
		if (refAreaLeft && refAreaRight) {
			const [left, right] = [refAreaLeft, refAreaRight].sort()
			setStartTime(left)
			setEndTime(right)
			const zoomedData = originalData.filter((d) => d.time >= left && d.time <= right)
			setData(zoomedData.length > 1 ? zoomedData : originalData.slice(0, 2))
		}
		setRefAreaLeft(null)
		setRefAreaRight(null)
		setIsSelecting(false)
	}

	const handleReset = () => {
		setStartTime(originalData[0].time)
		setEndTime(originalData[originalData.length - 1].time)
		setData(originalData)
	}

	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (!originalData.length || !chartRef.current) return

		setIsZooming(true)

		const zoomFactor = 0.1
		const direction = e.deltaY < 0 ? 1 : -1
		const currentRange =
			new Date(endTime || originalData[originalData.length - 1].time).getTime() -
			new Date(startTime || originalData[0].time).getTime()
		const zoomAmount = currentRange * zoomFactor * direction

		const chartRect = chartRef.current.getBoundingClientRect()
		const mouseX = e.clientX - chartRect.left
		const chartWidth = chartRect.width
		const mousePercentage = mouseX / chartWidth

		const currentStartTime = new Date(startTime || originalData[0].time).getTime()
		const currentEndTime = new Date(endTime || originalData[originalData.length - 1].time).getTime()

		const newStartTime = new Date(currentStartTime + zoomAmount * mousePercentage)
		const newEndTime = new Date(currentEndTime - zoomAmount * (1 - mousePercentage))

		setStartTime(newStartTime.toISOString())
		setEndTime(newEndTime.toISOString())

		const zoomedData = originalData.filter((d) => new Date(d.time) >= newStartTime && new Date(d.time) <= newEndTime)

		setData(zoomedData.length > 1 ? zoomedData : originalData.slice(0, 2))
		setTimeout(() => setIsZooming(false), 300)
	}

	const formatXAxis = (tickItem: string) => {
		const date = new Date(tickItem)
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	return (
		<Card className="w-full h-full">
			<CardHeader className="flex-col items-stretch space-y-0 border-b p-0 sm:flex-row hidden sm:flex">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Treasury AXS + ETH Inflows Zoomable Chart</CardTitle>
				</div>
				<div className="flex">
					<div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l bg-muted/10 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
						<span className="text-xs text-muted-foreground">Total inflows</span>
						<span className="text-lg font-bold leading-none sm:text-3xl">{total.toLocaleString()}</span>
					</div>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6 h-full sm:h-[calc(100%-150px)]">
				<ChartContainer config={chartConfig} className="w-full h-full">
					<div className="h-full" onWheel={handleWheel} ref={chartRef}>
						<div className="flex justify-end my-2 sm:mb-4">
							<Button
								variant="outline"
								onClick={handleReset}
								disabled={!startTime && !endTime}
								className="text-xs sm:text-sm"
							>
								Reset
							</Button>
						</div>
						<ResponsiveContainer width="100%" height="100%">
							<ComposedChart
								data={data}
								margin={{
									top: 10,
									right: 10,
									left: 0,
									bottom: 0,
								}}
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onMouseLeave={handleMouseUp}
							>
								<defs>
									<linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor={chartConfig.totalInflows.color} stopOpacity={0.8} />
										<stop offset="95%" stopColor={chartConfig.totalInflows.color} stopOpacity={0.1} />
									</linearGradient>
								</defs>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="time"
									tickFormatter={formatXAxis}
									tickLine={false}
									axisLine={false}
									tickMargin={4}
									minTickGap={16}
									style={{ fontSize: '10px', userSelect: 'none' }}
								/>
								<YAxis tickLine={false} axisLine={false} style={{ fontSize: '10px', userSelect: 'none' }} width={30} />
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent
											className="w-[150px] sm:w-[200px] font-mono text-xs sm:text-sm"
											nameKey="totalInflows"
											labelFormatter={(value) => new Date(value).toLocaleString()}
										/>
									}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Area
									type="monotone"
									dataKey="totalInflows"
									stroke={chartConfig.totalInflows.color}
									fillOpacity={1}
									fill="url(#colorEvents)"
									isAnimationActive={true}
								/>
								{refAreaLeft && refAreaRight && (
									<ReferenceArea
										x1={refAreaLeft}
										x2={refAreaRight}
										strokeOpacity={0.3}
										fill="hsl(var(--foreground))"
										fillOpacity={0.05}
									/>
								)}
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
