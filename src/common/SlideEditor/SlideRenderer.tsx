import styles from './SlideRenderer.css'
import { Selection, Slide, Tabs } from '../../types'
import { returnGradientString } from '../Tools/returnGradientString'
import { useContext } from 'react'
import { PresenterContext } from '../../presenterContext/PresenterContext'
import { SlideElement } from './SlideElement'

type SlideRendererProps = {
	scale: number
	slide: Slide
	isWorkspace: boolean
	selection: Selection
	createOnClick: (objectId: string) => () => void
	selectOnClick?: () => void
}

function SlideRenderer({
	scale,
	slide,
	isWorkspace,
	selection,
	createOnClick,
	selectOnClick,
}: SlideRendererProps) {
	const width = 1920 / scale
	const height = 1080 / scale

	const { editedSlideRef } = useContext(PresenterContext)

	const selectedTab = selection.selectedTab

	const backgroundStyle = slide.background.image
		? { backgroundImage: `url("${slide.background.image.value}")` }
		: { background: returnGradientString(slide.background.color) }

	return (
		<div
			onClick={selectOnClick}
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
				return (
					<SlideElement
						key={index}
						object={newObj}
						isWorkspace={isWorkspace}
						slideId={slide.id}
						scale={scale}
						selected={selected}
						onClick={createOnClick(newObj.id)}
					/>
				)
			})}
		</div>
	)
}

export { SlideRenderer }
