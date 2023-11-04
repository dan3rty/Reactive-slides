import React, { useContext } from 'react'
import styles from './SlideEditor.module.css'
import { presentation } from '../../../App'
import { TextComponent } from '../../../common/slideObjects/TextComponent'
import { BlockType, Slide } from '../../../types'
import { ImageComponent } from '../../../common/slideObjects/ImageComponent'
import { returnGradientString } from '../../../common/tools/returnGradientString'

type SlideEditorProps = {
	scale: number
	slide?: Slide
}
function SlideEditor(props: SlideEditorProps) {
	const chosen = useContext(presentation).selection.slideId
	let curSlide: Slide | undefined
	if (props.slide) {
		curSlide = props.slide
	} else {
		curSlide = useContext(presentation).presentation.slides.find((slide) => slide.id === chosen)
	}
	const slideStyle: React.CSSProperties = {
		width: 1920 / props.scale + 'px',
		height: 1080 / props.scale + 'px',
		background: returnGradientString(curSlide.background.color),
	}
	console.log(returnGradientString(curSlide.background.color))
	if (curSlide) {
		const slideObjects = curSlide.objects
		const objectsToRender = slideObjects.map((object) => {
			if (object.blockType === BlockType.TEXT) {
				return <TextComponent text={object} scale={props.scale}></TextComponent>
			}
			if (object.blockType === BlockType.IMAGE) {
				return <ImageComponent image={object} scale={props.scale}></ImageComponent>
			}
			return <div></div>
		})
		return (
			<div style={slideStyle} className={styles.slideEditor}>
				{objectsToRender}
			</div>
		)
	}
	return <div></div>
}

export { SlideEditor }
