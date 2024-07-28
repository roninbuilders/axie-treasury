import { useQuery } from '@tanstack/react-query'
import { api } from './base'

export interface TreasuryData {
	time: string; // ISO string format for date
	treasuryETH: string;
	treasuryAXS: string;
	inflowETH: string;
	inflowAXS: string;
	totalInflows: number;
}

const getTreasury = (time: string) => {
	const validTimes = ['1w', '1d']
	if (!validTimes.includes(time)) {
		throw new Error('Invalid time')
	}
	const data = api.get(`?agr_time=${time}`)
	return data
}

export const useTreasury = (time: string) => {
	return useQuery({ queryKey: ['treasury', time], queryFn: () => getTreasury(time) })
}

export const getTreasuryHistory = (start?: string, end?: string) => {
	const data = api.get(start && end ? `?start=${start}&end=${end}` : start ? `?start=${start}` : end ? `?end=${end}` : '')
	return data
}

export const useTreasuryHistory = (start?: string, end?: string) => {
	return useQuery({ queryKey: ['treasury', start, end], queryFn: () => getTreasuryHistory(start, end) })
}
