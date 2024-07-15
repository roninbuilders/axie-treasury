import { NextResponse, type NextRequest } from 'next/server'
import jsonData from './transfers_since_16377111.json'

type AggregationTime = 'block' | '1d'

type APIResponse = {
	time: string
	treasuryETH: string
	treasuryAXS: string
	inflowETH: string
	inflowAXS: string
	totalInflows: number
	blockNumber?: number
	blockTimestamp?: number
}

export async function GET(request: NextRequest) {
	// Get the day parameter from the query string
	const searchParams = request.nextUrl.searchParams
	const time = searchParams.get('agr_time') || ('block' as AggregationTime)
	const start = searchParams.get('start') || false
	const end = searchParams.get('end') || false

	const filteredData = jsonData.filter((d: any) => {
		const blockTimestamp = Number(d.blockTimestamp) * 1000
		if (start && end) {
			return blockTimestamp >= new Date(start).getTime() && blockTimestamp <= new Date(end).getTime()
		}
		if (start) {
			return blockTimestamp >= new Date(start).getTime()
		}
		if (end) {
			return blockTimestamp <= new Date(end).getTime()
		}
		return true
	})

	if (time !== 'block') {
		// Aggregate by day
		const dataByDay: Record<string, APIResponse> = {}
		filteredData.forEach((d: any) => {
			const day = new Date(Number(d.blockTimestamp) * 1000).toISOString().split('T')[0]
			if (!dataByDay[day]) {
				dataByDay[day] = {
					time: new Date(day).toISOString(),
					treasuryETH: d.balance.ethWei,
					treasuryAXS: d.balance.axsWei,
					inflowETH: d.inflow.ethWei,
					inflowAXS: d.inflow.axsWei,
					totalInflows: d.transfersCount,
				}
			}
			dataByDay[day].inflowETH = (BigInt(dataByDay[day].inflowETH) + BigInt(d.inflow.ethWei)).toString()
			dataByDay[day].inflowAXS = (BigInt(dataByDay[day].inflowAXS) + BigInt(d.inflow.axsWei)).toString()
			dataByDay[day].totalInflows += d.transfersCount
			dataByDay[day].treasuryETH = d.balance.ethWei
			dataByDay[day].treasuryAXS = d.balance.axsWei
		})

		if (time === '1d') {
			return NextResponse.json({ data: Object.values(dataByDay) satisfies APIResponse[] })
		}

		// Aggregate by week
		const dataByWeek: Record<string, APIResponse> = {}
		Object.entries(dataByDay).forEach(([day, d]) => {
			const week = new Date(day).toISOString().split('T')[0]
			if (!dataByWeek[week]) {
				dataByWeek[week] = {
					time: new Date(week).toISOString(),
					treasuryETH: d.treasuryETH,
					treasuryAXS: d.treasuryAXS,
					inflowETH: d.inflowETH,
					inflowAXS: d.inflowAXS,
					totalInflows: d.totalInflows,
				}
			}
			dataByWeek[week].inflowETH = (BigInt(dataByWeek[week].inflowETH) + BigInt(d.inflowETH)).toString()
			dataByWeek[week].inflowAXS = (BigInt(dataByWeek[week].inflowAXS) + BigInt(d.inflowAXS)).toString()
			dataByWeek[week].totalInflows += d.totalInflows
			dataByWeek[week].treasuryETH = d.treasuryETH
			dataByWeek[week].treasuryAXS = d.treasuryAXS
		})

		return NextResponse.json({ data: Object.values(dataByWeek) satisfies APIResponse[] })
	}

	return NextResponse.json({
		data: filteredData.map((d: any) => {
			return {
				time: new Date(Number(d.blockTimestamp) * 1000).toISOString(),
				treasuryETH: d.balance.ethWei,
				treasuryAXS: d.balance.axsWei,
				inflowETH: d.inflow.ethWei,
				inflowAXS: d.inflow.axsWei,
				totalInflows: d.transfersCount,
				blockNumber: Number(d.blockNumber),
			}
		}) satisfies APIResponse[],
	})
}
