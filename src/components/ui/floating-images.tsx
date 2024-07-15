'use client'
import { FloatingImage } from '@/components/images/FloatingImage'
import { IMAGES } from '../images/constants'

export function FloatingImages() {
	return (
		<>
			<FloatingImage src={IMAGES.ROCKET} top="top-[395px]" left="left-[240px]" width={89 * 1.5} height={100 * 1.5} />
			<FloatingImage src={IMAGES.CYLINDER} top="top-[390px]" left="left-[210px]" width={209 / 7} height={200 / 7} />
			<FloatingImage src={IMAGES.CUBE} top="top-[490px]" left="left-[390px]" width={209 / 7} height={200 / 7} />
			<FloatingImage src={IMAGES.HALF_SPHERE} top="top-[490px]" left="left-[190px]" width={209 / 7} height={200 / 7} />

			<FloatingImage
				src={IMAGES.SEARCHING}
				top="top-[205px]"
				left="right-[230px]"
				width={89 * 1.5}
				height={100 * 1.5}
			/>
			<FloatingImage src={IMAGES.CYLINDER} top="top-[200px]" left="right-[200px]" width={209 / 7} height={200 / 7} />
			<FloatingImage src={IMAGES.CUBE} top="top-[300px]" left="right-[380px]" width={209 / 7} height={200 / 7} />
			<FloatingImage src={IMAGES.HALF_SPHERE} top="top-[300px]" left="right-[180px]" width={209 / 7} height={200 / 7} />
		</>
	)
}
