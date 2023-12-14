import React, { MutableRefObject } from 'react'
import styles from './ImageComponent.css'
import { ImageBlock, ImageSource } from '../../types'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type ImageProps = {
	image: ImageBlock
	scale: number
	onClick: () => void
	isWorkspace?: boolean
	slideId: string
}

const ImageComponent = React.forwardRef(function (
	{ image, scale, onClick, isWorkspace, slideId }: ImageProps,
	ref: React.ForwardedRef<HTMLImageElement>,
) {
	const imageStyle: React.CSSProperties = {
		width: image.baseState.width / scale + 'px',
		height: image.baseState.height / scale + 'px',
		top: image.baseState.y / scale - 3 + 'px',
		left: image.baseState.x / scale - 3 + 'px',
		rotate: image.baseState.rotation + 'deg',
	}
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref as MutableRefObject<HTMLElement | SVGSVGElement>,
			elementId: image.id,
			slideId: slideId,
		})
	}
	if (image.typeValue === ImageSource.PATH) {
		return (
			<img
				ref={ref}
				draggable='false'
				style={imageStyle}
				className={styles.image}
				src={image.value}
				alt='image'
				onClick={onClick}
			></img>
		)
	}
	return <div style={imageStyle}></div>
})

export { ImageComponent }
