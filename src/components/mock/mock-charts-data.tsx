import { ChartConfig } from '../ui/chart'

interface ChartDataPoint {
	date: number
	value: number
	inflowsETH: number
	inflowsAXS: number
}

export const chartConfig = {
	value: {
		label: 'Treasury',
		color: 'red',
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
