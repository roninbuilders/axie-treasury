'use client'

import * as React from 'react'
import { Area, Bar, CartesianGrid, ComposedChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TreasuryData, useTreasury } from '../../api/useTreasury'
import { formatEther } from 'viem'
import { ChartConfig } from '../ui/chart'

const formatBigInt = (a: bigint) => parseFloat(formatEther(BigInt(a))).toFixed(4).toString()


const chartConfig = {
	treasuryETH: {
		label: 'Treasury ETH',
		color: 'red',
	},
	treasuryAXS: {
		label: 'Treasury AXS',
		color: 'blue',
	},
	inflowsETH: {
		label: 'Inflows ETH',
		color: 'hsl(var(--chart-7))',
	},
	inflowsAXS: {
		label: 'Inflows AXS',
		color: 'hsl(var(--chart-8))',
	},
} satisfies ChartConfig

interface FilteredDataItem {
	date: string;
	treasuryETH: string;
	treasuryAXS: string;
	inflowsETH: string;
	inflowsAXS: string;
	totalInflows: number;
}

export function RevenueChart() {
	const [timeRange, setTimeRange] = React.useState('1d')
	const { data: res } = useTreasury(timeRange)

	const filteredData: [] = res?.data?.data.map((item: TreasuryData) => {
		return {
			date: item.time,
			treasuryETH: formatBigInt(BigInt(item.treasuryETH)),
			treasuryAXS: formatBigInt(BigInt(item.treasuryAXS)),
			inflowsETH: formatBigInt(BigInt(item.inflowETH)),
			inflowsAXS: formatBigInt(BigInt(item.inflowAXS)),
			totalInflows: item.totalInflows,
		} as FilteredDataItem
	})

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Treasury detailed chart</CardTitle>
					<CardDescription>Showing total treasury value, inflows, and outflows.</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="1d" className="rounded-lg">
							Daily
						</SelectItem>
						<SelectItem value="1w" className="rounded-lg">
							Wekly
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<ComposedChart data={filteredData}>
						<defs>
							<linearGradient id="treasuryETH" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#2662d9" stopOpacity={1} />
								<stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="treasuryAXS" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#13c5fd" stopOpacity={1} />
								<stop offset="95%" stopColor="#1662d9" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value)
								if (timeRange === '1d') {
									return date.toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
									})
								}
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								})
							}}
						/>
						<YAxis />
						<CartesianGrid vertical={false} />
						<Area type="monotone" dataKey="treasuryETH" fill="url(#treasuryETH)" stroke="#2662d9" />
						<Area type="monotone" dataKey="treasuryAXS" fill="url(#treasuryAXS)" stroke="#13c5fd" />
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="inflowsETH" stackId="a" fill="red" radius={[0, 0, 0, 0]} />
						<Bar dataKey="inflowsAXS" stackId="b" fill="blue" radius={[4, 4, 0, 0]} />
					</ComposedChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
