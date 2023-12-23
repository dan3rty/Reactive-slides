import styles from './SlideRenderer.css'
import { Tabs } from '../../types'
import { returnGradientString } from '../Tools/returnGradientString'
import { useContext, useEffect } from 'react'
import { PresenterContext } from '../../presenterContext/PresenterContext'
import { SlideElement } from './SlideElement'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { joinCssClasses } from '../../classes/joinCssClasses'

type SlideRendererProps = {
	scale: number
	slideId: string
	isWorkspace: boolean
}

const SLIDE_HEIGHT = 1080
const SLIDE_WIDTH = 1920
function SlideRenderer({ scale, slideId, isWorkspace }: SlideRendererProps) {
	const width = SLIDE_WIDTH / scale //magical number
	const height = SLIDE_HEIGHT / scale
	const { createDeleteObjectAction, createClearObjectSelectionAction } = useAppActions()

	const { editedSlideRef } = useContext(PresenterContext)
	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const slide = slides.find((slide) => slide.id == slideId)

	const selectedTab = selection.selectedTab

	const backgroundStyle = slide.background.image
		? { backgroundImage: `url("${slide.background.image.value}")` }
		: { background: returnGradientString(slide.background.color) }

	const deleteOnClick = (e: KeyboardEvent) => {
		if (e.code === 'Delete') {
			createDeleteObjectAction(slideId, selection.objectsId)
			createClearObjectSelectionAction()
		}
	}

	const clearSelectionObjectsOnClick = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			createClearObjectSelectionAction()
		}
	}

	useEffect(() => {
		if (!isWorkspace) {
			return
		}

		document.addEventListener('keydown', deleteOnClick)
		document.addEventListener('keydown', clearSelectionObjectsOnClick)
		return () => {
			document.removeEventListener('keydown', deleteOnClick)
			document.removeEventListener('keydown', clearSelectionObjectsOnClick)
		}
	}, [])

	return (
		<div
			style={{
				...backgroundStyle,
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={joinCssClasses(
				styles.slideEditor,
				isWorkspace ? styles.slideEditorWrapper : null,
			)}
			ref={isWorkspace ? editedSlideRef : null}
		>
			{slide.objects.map((obj, index) => {
				const newObj = { ...obj }
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
					/>
				)
			})}
		</div>
	)
}

export { SlideRenderer }
