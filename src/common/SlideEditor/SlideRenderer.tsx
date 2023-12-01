import styles from './SlideRenderer.css'
import { TextComponent } from '../SlideObjects/TextComponent'
import { BlockType, Selection, Slide, Tabs } from '../../types'
import { ImageComponent } from '../SlideObjects/ImageComponent'
import { returnGradientString } from '../Tools/returnGradientString'
import { PrimitiveComponent } from '../SlideObjects/PrimitiveComponent'
import {useContext, useRef} from "react";
import {PresenterContext} from "../../presenterContext/PresenterContext";
import {useDraggableObject} from "../../hooks/useDraggableObject";

type SlideRendererProps = {
	scale: number
	slide: Slide
	isWorkspace: boolean
	selection: Selection
	createOnClick: (objectId: string) => () => void
}

function SlideRenderer({
	scale,
	slide,
	isWorkspace,
	selection,
	createOnClick,
}: SlideRendererProps) {
	const width = 1920 / scale
	const height = 1080 / scale

	const {editedSlideRef} = useContext(PresenterContext)

	const selectedTab = selection.selectedTab

	const backgroundStyle = slide.background.image
		? { backgroundImage: `url("${slide.background.image.value}")` }
		: { background: returnGradientString(slide.background.color) }

	return (
		<div
			style={{
				...backgroundStyle,
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={styles.slideEditor}
			ref={isWorkspace ? editedSlideRef : null}
		>
			{slide.objects.map((obj, index) => {
				const newObj = structuredClone(obj)
				const selected = selection.objectsId.includes(obj.id) && isWorkspace
				if (selection) {
					if (
						obj.animation &&
						selection.keyFrameId &&
						selected &&
						selectedTab == Tabs.ANIMATION
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
				const ref = useRef(null)
				if (isWorkspace) {
					useDraggableObject({
						elementRef: ref,
						elementId: obj.id,
						slideId: slide.id
					})
				}
				switch (newObj.blockType) {
					case BlockType.IMAGE:
						return (
							<div ref={ref}>
								<ImageComponent
									key={index}
									image={newObj}
									scale={scale}
									selected={selected}
									onClick={createOnClick(obj.id)}
								/>
							</div>
						)
					case BlockType.PRIMITIVE:
						return (
							<div ref={ref}>
								<PrimitiveComponent
									key={index}
									primitive={newObj}
									scale={scale}
									selected={selected}
									onClick={createOnClick(obj.id)}
								/>
							</div>
						)
					case BlockType.TEXT:
						return (
							<div ref={ref}>
								<TextComponent
									key={index}
									text={newObj}
									scale={scale}
									selected={selected}
									onClick={createOnClick(obj.id)}
								/>
							</div>
						)
				}
			})}
		</div>
	)
}

export { SlideRenderer }
