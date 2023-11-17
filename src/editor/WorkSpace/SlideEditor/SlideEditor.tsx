import React, { useContext } from 'react'
import styles from './SlideEditor.module.css'
import { presentation } from '../../../App'
import { TextComponent } from '../../../common/slideObjects/TextComponent'
import { BlockType, ImageSource, Slide } from '../../../types'
import { ImageComponent } from '../../../common/slideObjects/ImageComponent'
import { returnGradientString } from '../../../common/tools/returnGradientString'
import { PrimitiveComponent } from '../../../common/slideObjects/PrimitiveComponent'

type SlideEditorProps = {
	scale: number
	slide?: Slide
}

function SlideEditor(props: SlideEditorProps) {
	const chosen = useContext(presentation).selection.slideId
	const chosenObjects = useContext(presentation).selection.objectsId
	let curSlide = props.slide
	if (props.slide) {
		curSlide = props.slide
	} else {
		const slide = useContext(presentation).presentation.slides.find(
			(slide) => slide.id === chosen,
		)
		if (slide) {
			curSlide = slide
		}
	}
	if (curSlide && chosenObjects) {
		let slideStyle: React.CSSProperties = {
			width: 1920 / props.scale + 'px',
			height: 1080 / props.scale + 'px',
			background: returnGradientString(curSlide.background.color),
		}
		if (curSlide.background.image) {
			if (curSlide.background.image.typeValue === ImageSource.PATH) {
				slideStyle = {
					width: 1920 / props.scale + 'px',
					height: 1080 / props.scale + 'px',
					background: 'url(' + curSlide.background.image.value + ')',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}
			}
		}
		const slideObjects = curSlide.objects
		const objectsToRender = slideObjects.map((object) => {
			const selected = !!chosenObjects.find((id) => id === object.id)

			if (object.blockType === BlockType.TEXT) {
				return (
					<TextComponent
						text={object}
						scale={props.scale}
						selected={selected}
					></TextComponent>
				)
			}
			if (object.blockType === BlockType.IMAGE) {
				return (
					<ImageComponent
						image={object}
						scale={props.scale}
						selected={selected}
					></ImageComponent>
				)
			}
			if (object.blockType === BlockType.PRIMITIVE) {
				return <PrimitiveComponent primitive={object} scale={props.scale} />
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
