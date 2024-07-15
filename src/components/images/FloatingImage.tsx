import Image from 'next/image'
import s from './animation.module.css'
import clsx from 'clsx'

export const FloatingImage = ({
	top,
	left,
	src,
	width,
	height,
}: { top: string; left: string; src: string; width: `${number}` | number; height: `${number}` | number }) => (
	<Image
		className={clsx(['absolute hidden xl:block', top, left, s.animation])}
		src={src}
		alt="left"
		width={width}
		height={height}
	/>
)
