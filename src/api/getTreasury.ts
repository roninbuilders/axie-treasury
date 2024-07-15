import { useQuery } from '@tanstack/react-query'
import { api } from './base'

const getTreasury = (time: string) => {
	console.log('time', time)
	const data = api.get(`?agr_time=${time}`)

	console.log(data)

	return data
}

export const useTreasury = (time: string) => {
	return useQuery({ queryKey: ['treasury', time], queryFn: () => getTreasury(time) })
}
