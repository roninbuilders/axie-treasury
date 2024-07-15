'use client'

import * as React from 'react'
import { Area, Bar, CartesianGrid, ComposedChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { chartConfig } from '../mock/mock-charts-data'
import { useTreasury } from '../../api/useTreasury'

const formatBitInt = (a =>
  (Number(a).toString().match(/e/) ? Number(Number(a).toString().match(/[^e]*/)[0]) : Number(a)).toFixed(2)
)

export function RevenueChart() {
	const [timeRange, setTimeRange] = React.useState('30d')

  const { data } = useTreasury(timeRange)

	const filteredData = data?.data?.data.map((item) => {
			return {
			date: (new Date(item.time)).getTime(),
			inflowsETH: formatBitInt((BigInt(item.treasuryETH)/10n**18n)),
			inflowsAXS: formatBitInt((BigInt(item.treasuryAXS)/10n**18n)),
			value: item.totalInflows,
		}
	})

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Interactive chart</CardTitle>
					<CardDescription>Showing total treasury value, inflows, and outflows.</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="historical" className="rounded-lg">
							Historical
						</SelectItem>
						<SelectItem value="360d" className="rounded-lg">
							Last year
						</SelectItem>
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="1w" className="rounded-lg">
							Last 7 days
						</SelectItem>
						<SelectItem value="1d" className="rounded-lg">
							Last day
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<ComposedChart data={filteredData}>
						<defs>
							<linearGradient id="treasury" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#2662d9" stopOpacity={1} />
								<stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
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
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})
							}}
						/>
						<YAxis />
						<CartesianGrid vertical={false} />
						<Area type="monotone" dataKey="value" fill="url(#treasury)" stroke="#2662d9" />
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="inflowsETH" stackId="a" fill="red" radius={[0, 0, 0, 0]} />
						<Bar dataKey="inflowsAXS" stackId="a" fill="blue" radius={[4, 4, 0, 0]} />
					</ComposedChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
