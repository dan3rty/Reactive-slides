import React from 'react'
import './ImageComponent.css'
import { ImageBlock, ImageSource } from '../../types'

type ImageProps = {
	image: ImageBlock
	scale: number
	selected: boolean
}

function ImageComponent(props: ImageProps) {
	const imageStyle: React.CSSProperties = {
		display: 'flex',
		position: 'absolute',
		width: props.image.baseState.width / props.scale + 'px',
		height: props.image.baseState.height / props.scale + 'px',
		top: props.image.baseState.y / props.scale + 'px',
		left: props.image.baseState.x / props.scale + 'px',
		rotate: props.image.baseState.rotation + 'deg',
		borderColor: '#000000',
		borderStyle: 'dashed',
		borderWidth: props.selected ? '3px' : '0',
	}
	if (props.image.typeValue === ImageSource.PATH) {
		return <img style={imageStyle} src={props.image.value} alt='image'></img>
	}
	return <div style={imageStyle}></div>
}

export { ImageComponent }
