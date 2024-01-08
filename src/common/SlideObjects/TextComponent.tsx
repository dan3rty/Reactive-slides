import React, { useEffect, useRef } from 'react'
import styles from './TextComponent.css'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { TextBlock } from '../../model/types'

type TextProps = {
	textId: string
	scale: number
	isWorkSpace: boolean
	onClick: () => void
	slideId: string
}

const TextComponent = function ({ textId, scale, isWorkSpace, onClick, slideId }: TextProps) {
	const ref = useRef(null)
	const textareaRef = useRef(null)
	const text = useAppSelector((state) =>
		state.presentation.slides
			.find((slide) => slide.id == slideId)
			.objects.find((object) => object.id == textId),
	) as TextBlock

	const textStyle: React.CSSProperties = {
		color: text.color.hsl,
		fontSize: text.fontSize / scale + 'px',
		fontWeight: text.bold ? 'bold' : 'normal',
		textDecoration:
			text.strokethrough && text.underline
				? 'line-through underline'
				: text.strokethrough
				? 'line-through'
				: text.underline
				? 'underline'
				: 'none',
		fontStyle: text.italic ? 'italic' : 'normal',
		textAlign: text.horizontalAlign,
		fontFamily: text.fontFamily,
		overflowY: isWorkSpace ? 'auto' : 'hidden',
	}
	const { createChangeObjectAction } = useAppActions()
	const onBlur = () => {
		ref.current.style.userSelect = 'none'
	}

	const onFocus = () => {
		ref.current.style.userSelect = 'text'
	}

	useEffect(() => {
		textareaRef.current.addEventListener('focus', onFocus)
		textareaRef.current.addEventListener('blur', onBlur)
		return () => {
			textareaRef.current?.removeEventListener('focus', onFocus)
			textareaRef.current?.removeEventListener('blur', onBlur)
		}
	}, [])
	return (
		<div ref={ref} style={{ userSelect: 'none' }}>
			<textarea
				ref={textareaRef}
				disabled={!isWorkSpace}
				style={textStyle}
				className={styles.text}
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
