import React from 'react'
import styles from './ImageComponent.module.css'
import { ImageBlock, ImageSource } from '../../types'

type ImageProps = {
	image: ImageBlock
	scale: number
	selected: boolean
}

function ImageComponent(props: ImageProps) {
	const imageStyle: React.CSSProperties = {
		width: props.image.baseState.width / props.scale + 'px',
		height: props.image.baseState.height / props.scale + 'px',
		top: props.image.baseState.y / props.scale - 3 + 'px',
		left: props.image.baseState.x / props.scale - 3 + 'px',
		rotate: props.image.baseState.rotation + 'deg',
		borderColor: props.selected ? '#000000' : '#FFFFFF00',
	}
	if (props.image.typeValue === ImageSource.PATH) {
		return (
			<img
				style={imageStyle}
				className={styles.image}
				src={props.image.value}
				alt='image'
			></img>
		)
	}
	return <div style={imageStyle}></div>
}

export { ImageComponent }
