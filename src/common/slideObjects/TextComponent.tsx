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
		display: 'flex',
		alignItems: 'baseline',
		position: 'absolute',
		flexWrap: 'wrap',
		width: props.text.baseState.width / props.scale + 'px',
		height: props.text.baseState.height / props.scale + 'px',
		top: props.text.baseState.y / props.scale - 3 + 'px',
		left: props.text.baseState.x / props.scale - 3 + 'px',
		rotate: props.text.baseState.rotation + 'deg',
		borderColor: props.selected ? '#000000' : '#FFFFFF00',
		borderStyle: 'dashed',
		borderWidth: '3px',
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
				borderLeft: '0',
				borderTop: '0',
				borderRight: '0',
				borderStyle: char.underline ? 'solid' : 'none',
				borderColor: char.underline ? char.color.hex : '#FFFFFF',
				fontStyle: char.italic ? 'italic' : 'none',
				height: Math.max(),
			}}
		>
			{char.value}
		</div>
	))
	return <div style={textStyle}>{textToRender}</div>
}

export { TextComponent }
