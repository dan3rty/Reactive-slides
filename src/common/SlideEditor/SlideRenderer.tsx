import React, { useContext } from 'react'
import styles from './SlideRenderer.module.css'
import { presentation } from '../../App'
import { TextComponent } from '../slideObjects/TextComponent'
import { BlockType, Selection, Slide, Tabs } from '../../types'
import { ImageComponent } from '../slideObjects/ImageComponent'
import { returnGradientString } from '../tools/returnGradientString'
import { PrimitiveComponent } from '../slideObjects/PrimitiveComponent'

type SlideRendererProps = {
	scale: number
	slide: Slide
	selection?: Selection
}

function SlideRenderer({ scale, slide, selection }: SlideRendererProps) {
	const width = 1920 / scale
	const height = 1080 / scale
	return (
		<div
			style={{
				width: `${width}px`,
				height: `${height}px`,
				background: slide.background.image
					? `url("${slide.background.image.value}") cover no-repeat`
					: returnGradientString(slide.background.color),
				backgroundImage: slide.background.image
					? `url("${slide.background.image.value}")`
					: returnGradientString(slide.background.color),
			}}
			className={styles.slideEditor}
		>
			{slide.objects.map((obj) => {
				const newObj = structuredClone(obj)
				if (selection) {
					const selected = !!selection?.objectsId?.includes(obj.id)

					if (
						obj.animation &&
						selection.keyFrameId &&
						selected &&
						useContext(presentation).selection.selectedTab == Tabs.ANIMATION
					) {
						const index = obj.animation.stateList.findIndex(
							(state) => state.id === selection.keyFrameId,
						)

						newObj.baseState.width = obj.animation.stateList[index].state.width
						newObj.baseState.height = obj.animation.stateList[index].state.height
						newObj.baseState.rotation = obj.animation.stateList[index].state.rotation
						newObj.baseState.x = obj.animation.stateList[index].state.x
						newObj.baseState.y = obj.animation.stateList[index].state.y
					}
				}
				switch (newObj.blockType) {
					case BlockType.IMAGE:
						return (
							<ImageComponent
								image={newObj}
								scale={scale}
								selected={!!selection?.objectsId?.includes(obj.id)}
							/>
						)
					case BlockType.PRIMITIVE:
						return (
							<PrimitiveComponent
								primitive={newObj}
								scale={scale}
								selected={!!selection?.objectsId?.includes(obj.id)}
							/>
						)
					case BlockType.TEXT:
						return (
							<TextComponent
								text={newObj}
								scale={scale}
								selected={!!selection?.objectsId?.includes(obj.id)}
							/>
						)
				}
			})}
		</div>
	)
}

export { SlideRenderer }
