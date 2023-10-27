import React from 'react'
import './TextComponent.css'
import { TextBlock } from '../../types'

type TextProps = {
	text: TextBlock
}

function TextComponent(props: TextProps) {
	const textStyle: React.CSSProperties = {
		display: 'flex',
		position: 'absolute',
		width: props.text.baseState.width + 'px',
		height: props.text.baseState.height + 'px',
		top: props.text.baseState.y + 'px',
		left: props.text.baseState.x + 'px',
	}
	const textToRender = props.text.value.map((char) => (
		<div
			style={{
				color: char.color.hex,
				fontSize: char.fontSize + 'px',
				height: Math.max(),
			}}
		>
			{char.value}
		</div>
	))
	return <div style={textStyle}>{textToRender}</div>
}

export { TextComponent }
