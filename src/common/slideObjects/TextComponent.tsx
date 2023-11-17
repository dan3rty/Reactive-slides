import React from 'react'
import styles from './TextComponent.module.css'
import { TextBlock } from '../../types'

type TextProps = {
	text: TextBlock
	scale: number
	selected: boolean
}

function TextComponent(props: TextProps) {
	const textStyle: React.CSSProperties = {
		width: props.text.baseState.width / props.scale + 'px',
		height: props.text.baseState.height / props.scale + 'px',
		top: props.text.baseState.y / props.scale - 3 + 'px',
		left: props.text.baseState.x / props.scale - 3 + 'px',
		rotate: props.text.baseState.rotation + 'deg',
		borderColor: props.selected ? '#000000' : '#FFFFFF00',
	}
	const textToRender = props.text.value.map((char) => (
		<div
			className={styles.char}
			style={{
				color: char.color.hex,
				fontSize: char.fontSize / props.scale + 'px',
				fontWeight: char.bold ? 'bold' : 'normal',
				textDecoration: char.strokethrough ? 'line-through' : 'none',
				borderBottom: char.underline ? char.fontSize / props.scale / 10 + 'px' : '0',
				borderStyle: char.underline ? 'solid' : 'none',
				borderColor: char.underline ? char.color.hex : '#FFFFFF',
				fontStyle: char.italic ? 'italic' : 'none',
			}}
		>
			{char.value}
		</div>
	))
	return (
		<div style={textStyle} className={styles.text}>
			{textToRender}
		</div>
	)
}

export { TextComponent }
