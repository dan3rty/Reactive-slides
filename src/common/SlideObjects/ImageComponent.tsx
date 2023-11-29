import React from 'react'
import styles from './ImageComponent.css'
import { ImageBlock, ImageSource } from '../../types'

type ImageProps = {
	image: ImageBlock
	scale: number
	selected: boolean
	onClick: () => void
}

function ImageComponent({ image, scale, selected, onClick }: ImageProps) {
	const imageStyle: React.CSSProperties = {
		width: image.baseState.width / scale + 'px',
		height: image.baseState.height / scale + 'px',
		top: image.baseState.y / scale - 3 + 'px',
		left: image.baseState.x / scale - 3 + 'px',
		rotate: image.baseState.rotation + 'deg',
		borderColor: selected ? '#000000' : '#FFFFFF00',
	}
	if (image.typeValue === ImageSource.PATH) {
		return (
			<img
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
