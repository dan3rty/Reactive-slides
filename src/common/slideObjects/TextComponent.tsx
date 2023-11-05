import React from 'react'
import styles from './TextComponent.module.css'
import { TextBlock } from '../../types'

type TextProps = {
	text: TextBlock
	scale: number
}

function TextComponent(props: TextProps) {
	const textStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'baseline',
		position: 'absolute',
		flexWrap: 'wrap',
		width: props.text.baseState.width / props.scale + 'px',
		height: props.text.baseState.height / props.scale + 'px',
		top: props.text.baseState.y / props.scale + 'px',
		left: props.text.baseState.x / props.scale + 'px',
		rotate: props.text.baseState.rotation + 'deg',
	}
	const textToRender = props.text.value.map((char) => (
		<div
			className={styles.char}
			style={{
				color: char.color.hex,
				fontSize: char.fontSize / props.scale + 'px',
				height: Math.max(),
			}}
		>
			{char.value}
		</div>
	))
	return <div style={textStyle}>{textToRender}</div>
}

export { TextComponent }
