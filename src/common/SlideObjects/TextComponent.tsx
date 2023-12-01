import React, { useRef } from 'react'
import styles from './TextComponent.css'
import { TextBlock } from '../../types'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type TextProps = {
	text: TextBlock
	scale: number
	selected: boolean
	onClick: () => void
	isWorkspace: boolean
	id: string
	slideId: string
}

function TextComponent({ text, scale, selected, onClick, isWorkspace, slideId, id }: TextProps) {
	const textStyle: React.CSSProperties = {
		width: text.baseState.width / scale + 'px',
		height: text.baseState.height / scale + 'px',
		top: text.baseState.y / scale - 3 + 'px',
		left: text.baseState.x / scale - 3 + 'px',
		rotate: text.baseState.rotation + 'deg',
		borderColor: selected ? '#000000' : '#FFFFFF00',
	}
	const ref = useRef(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}
	const textToRender = text.value.map((char, index) => (
		<div
			key={index}
			className={styles.char}
			style={{
				color: char.color.hex,
				fontSize: char.fontSize / scale + 'px',
				fontWeight: char.bold ? 'bold' : 'normal',
				textDecoration: char.strokethrough ? 'line-through' : 'none',
				borderBottomWidth: char.underline ? char.fontSize / scale / 10 + 'px' : '0',
				borderStyle: char.underline ? 'solid' : 'none',
				borderColor: char.underline ? char.color.hex : '#FFFFFF',
				fontStyle: char.italic ? 'italic' : 'none',
			}}
			onClick={onClick}
		>
			{char.value}
		</div>
	))
	return (
		<div style={textStyle} className={styles.text} ref={ref}>
			{textToRender}
		</div>
	)
}

export { TextComponent }
