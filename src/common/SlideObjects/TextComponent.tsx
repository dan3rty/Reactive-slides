import React from 'react'
import styles from './TextComponent.css'
import { TextBlock } from '../../types'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type TextProps = {
	text: TextBlock
	scale: number
	onClick: () => void
	isWorkspace: boolean
	slideId: string
}

const TextComponent = React.forwardRef(function (
	{ text, scale, onClick, isWorkspace, slideId }: TextProps,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	const textStyle: React.CSSProperties = {
		width: text.baseState.width / scale + 'px',
		height: text.baseState.height / scale + 'px',
		top: text.baseState.y / scale - 3 + 'px',
		left: text.baseState.x / scale - 3 + 'px',
		rotate: text.baseState.rotation + 'deg',
	}
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref as React.MutableRefObject<HTMLElement | SVGSVGElement>,
			elementId: text.id,
			slideId: slideId,
		})
	}
	const TextToRender = text.value.map((char, index) => (
		<div
			key={index}
			className={styles.char}
			style={{
				color: char.color.hsl,
				fontSize: char.fontSize / scale + 'px',
				fontWeight: char.bold ? 'bold' : 'normal',
				textDecoration: char.strokethrough ? 'line-through' : 'none',
				borderBottomWidth: char.underline ? char.fontSize / scale / 10 + 'px' : '0',
				borderStyle: char.underline ? 'solid' : 'none',
				borderColor: char.underline ? char.color.hsl : '#FFFFFF',
				fontStyle: char.italic ? 'italic' : 'none',
			}}
			onClick={onClick}
		>
			{char.value}
		</div>
	))
	return (
		<div style={textStyle} className={styles.text} ref={ref}>
			{TextToRender}
		</div>
	)
})

export { TextComponent }
