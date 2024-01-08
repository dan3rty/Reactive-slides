import styles from './PlayerSlideRenderer.css'
import { Slide } from '../../model/types'
import { returnGradientString } from '../Tools/returnGradientString'
import { joinCssClasses } from '../../classes/joinCssClasses'
import { SlideElement } from '../SlideEditor/SlideElement'
import { getScaledSlideSize, getSlideSize } from '../Tools/getSlideSize'
import React, { forwardRef } from 'react'

type SlideRendererProps = {
	slide: Slide
	isHidden?: boolean
}

const PlayerSlideRenderer = forwardRef(
	({ slide, isHidden }: SlideRendererProps, ref: React.ForwardedRef<HTMLDivElement>) => {
		const scale = getSlideSize().height / window.innerHeight
		const { width, height } = getScaledSlideSize(scale)

		const backgroundStyle = slide.background.image
			? { backgroundImage: `url("${slide.background.image.value}")` }
			: { background: returnGradientString(slide.background.color) }

		return (
			<div
				ref={ref}
				style={{
					...backgroundStyle,
					width: `${width}px`,
					height: `${height}px`,
					display: isHidden ? 'none' : 'auto',
					position: isHidden ? 'absolute' : 'inherit',
					top: isHidden ? window.innerHeight : 'auto',
					left: isHidden ? 0 : 'auto',
				}}
				className={joinCssClasses(styles.slide)}
			>
				{slide.objects.map((obj, index) => {
					return (
						<SlideElement
							key={index}
							object={obj}
							isWorkspace={false}
							slideId={slide.id}
							scale={scale}
							slideRef={null}
						/>
					)
				})}
			</div>
		)
	},
)

export { PlayerSlideRenderer }
