import React, { useContext } from 'react'
import './SlideEditor.css'
import { presentation } from '../../../App'
import { TextComponent } from '../../../common/slideObjects/TextComponent'
import { BlockType } from '../../../types'

function SlideEditor() {
	const chosen = useContext(presentation).selection.slideId
	const curSlide = useContext(presentation).presentation.slides.find(
		(slide) => slide.id === chosen,
	)
	if (curSlide) {
		const slideObjects = curSlide.objects
		const objectsToRender = slideObjects.map((object) => {
			if (object.blockType === BlockType.TEXT) {
				return <TextComponent text={object}></TextComponent>
			}
			return <div></div>
		})
		return <div className='slide-editor'>{objectsToRender}</div>
	}
	return <div></div>
}

export { SlideEditor }
