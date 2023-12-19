import React from 'react'
import styles from './ImageComponent.css'
import { ImageBlock, ImageSource } from '../../types'

type ImageProps = {
	image: ImageBlock
	scale: number
	onClick: () => void
	isWorkspace?: boolean
	slideId: string
}

const ImageComponent = function ({ image, onClick }: ImageProps) {
	const imageStyle: React.CSSProperties = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
	}
	if (image.typeValue === ImageSource.PATH) {
		return (
			<img
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
}

export { ImageComponent }
