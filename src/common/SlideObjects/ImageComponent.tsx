import React, { useRef } from 'react'
import styles from './ImageComponent.css'
import { ImageBlock, ImageSource } from '../../types'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type ImageProps = {
	image: ImageBlock
	scale: number
	selected: boolean
	onClick: () => void
	isWorkspace?: boolean
	slideId: string
}

function ImageComponent({ image, scale, selected, onClick, isWorkspace, slideId }: ImageProps) {
	const imageStyle: React.CSSProperties = {
		width: image.baseState.width / scale + 'px',
		height: image.baseState.height / scale + 'px',
		top: image.baseState.y / scale - 3 + 'px',
		left: image.baseState.x / scale - 3 + 'px',
		rotate: image.baseState.rotation + 'deg',
		borderColor: selected ? '#000000' : '#FFFFFF00',
	}
	const ref = useRef(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: image.id,
			slideId: slideId,
		})
	}
	if (image.typeValue === ImageSource.PATH) {
		return (
			<img
				draggable='false'
				ref={ref}
				style={imageStyle}
				className={styles.image}
				src={image.value}
				alt='image'
				onClick={onClick}
			></img>
		)
	}
	return <div style={imageStyle}></div>
}

export { ImageComponent }
