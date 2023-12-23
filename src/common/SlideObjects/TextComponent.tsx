import React from 'react'
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

const TextComponent = React.forwardRef(function (
	{ textId, scale, isWorkSpace, onClick, slideId }: TextProps,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	const slides = useAppSelector((state) => state.slides)
	const text: TextBlock = slides
		.find((slide) => slide.id == slideId)
		.objects.find((object) => object.id == textId) as TextBlock
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
	}
	console.log(textStyle)
	const { createChangeObjectAction } = useAppActions()
	return (
		<div ref={ref}>
			<textarea
				disabled={!isWorkSpace}
				style={textStyle}
				className={styles.text}
				contentEditable={isWorkSpace}
				onClick={onClick}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					createChangeObjectAction(slideId, text.id, {
						value: e.target.value,
					})
				}}
			>
				{text.value}
			</textarea>
		</div>
	)
})

export { TextComponent }
