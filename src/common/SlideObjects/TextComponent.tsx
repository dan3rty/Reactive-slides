import React, { useRef } from 'react'
import styles from './TextComponent.css'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { TextBlock } from '../../types'

type TextProps = {
	textId: string
	scale: number
	isWorkSpace: boolean
	onClick: () => void
	slideId: string
}

const TextComponent = function ({ textId, scale, isWorkSpace, onClick, slideId }: TextProps) {
	const ref = useRef(null)
	const text = useAppSelector((state) =>
		state.slides
			.find((slide) => slide.id == slideId)
			.objects.find((object) => object.id == textId),
	) as TextBlock

	const textStyle: React.CSSProperties = {
		color: text.color.hsl,
		fontSize: text.fontSize / scale + 'px',
		fontWeight: text.bold ? 'bold' : 'normal',
		textDecoration: text.strokethrough ? 'line-through' : 'none',
		borderBottomWidth: text.underline ? text.fontSize / scale / 10 + 'px' : '0',
		borderStyle: text.underline ? 'solid' : 'none',
		borderColor: text.underline ? text.color.hsl : '#FFFFFF',
		fontStyle: text.italic ? 'italic' : 'none',
	}
	const { createChangeObjectAction } = useAppActions()
	return (
		<div>
			<textarea
				ref={ref}
				style={textStyle}
				className={styles.text}
				contentEditable={isWorkSpace}
				value={text.value}
				onClick={onClick}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					createChangeObjectAction(slideId, text.id, {
						value: e.target.value,
					})
				}}
			></textarea>
		</div>
	)
}

export { TextComponent }
