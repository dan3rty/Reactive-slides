import React, { useContext } from 'react'
import styles from './SlideRenderer.module.css'
import { PresenterContext } from '../../App'
import { TextComponent } from '../SlideObjects/TextComponent'
import { BlockType, ImageSource, Slide, Tabs } from '../../types'
import { ImageComponent } from '../SlideObjects/ImageComponent'
import { returnGradientString } from '../Tools/returnGradientString'
import { PrimitiveComponent } from '../SlideObjects/PrimitiveComponent'

type SlideRenderer = {
	scale: number
	slide?: Slide
	isEditor?: boolean
	keyframe?: string
}

function SlideRenderer(props: SlideRenderer) {
	const chosen = useContext(PresenterContext).presenter.selection.slideId
	const chosenObjects = useContext(PresenterContext).presenter.selection.objectsId
	let curSlide = props.slide
	if (props.slide) {
		curSlide = props.slide
	} else {
		const slide = useContext(PresenterContext).presenter.presentation.slides.find(
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
			let index = 0
			const selected = !!chosenObjects.find((id) => id === object.id) && props.isEditor

			if (
				object.animation &&
				props.keyframe &&
				selected &&
				useContext(PresenterContext).presenter.selection.selectedTab == Tabs.ANIMATION
			) {
				while (object.animation.stateList[index].id !== props.keyframe) {
					index++
				}
				object.baseState.width = object.animation.stateList[index].state.width
				object.baseState.height = object.animation.stateList[index].state.height
				object.baseState.rotation = object.animation.stateList[index].state.rotation
				object.baseState.x = object.animation.stateList[index].state.x
				object.baseState.y = object.animation.stateList[index].state.y
			}
			if (object.blockType === BlockType.TEXT) {
				return <TextComponent text={object} scale={props.scale} selected={selected} />
			}
			if (object.blockType === BlockType.IMAGE) {
				return <ImageComponent image={object} scale={props.scale} selected={selected} />
			}
			if (object.blockType === BlockType.PRIMITIVE) {
				return (
					<PrimitiveComponent
						primitive={object}
						scale={props.scale}
						selected={selected}
					/>
				)
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

export { SlideRenderer }
