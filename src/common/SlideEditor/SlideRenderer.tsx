import styles from './SlideRenderer.css'
import { Tabs } from '../../types'
import { returnGradientString } from '../Tools/returnGradientString'
import React, { useEffect, useRef } from 'react'
import { SlideElement } from './SlideElement'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { joinCssClasses } from '../../classes/joinCssClasses'

type SlideRendererProps = {
	scale: number
	slideId: string
	isWorkspace: boolean
	setSlideRect?: React.Dispatch<React.SetStateAction<DOMRect>>
	currentAnimation?: number
	currentObject?: number
}

const SLIDE_HEIGHT = 1080
const SLIDE_WIDTH = 1920

function SlideRenderer({
	scale,
	slideId,
	isWorkspace,
	setSlideRect,
	currentAnimation,
	currentObject,
}: SlideRendererProps) {
	const width = SLIDE_WIDTH / scale //magical number
	const height = SLIDE_HEIGHT / scale
	const ref = useRef(null)
	const { createDeleteObjectAction, createClearObjectSelectionAction } = useAppActions()
	const previewMode = useAppSelector((state) => state.previewMode)
	const selection = useAppSelector((state) => state.selection)

	const slides = useAppSelector((state) => state.slides)
	const slide = slides.find((slide) => slide.id == slideId)

	const selectedTab = selection.selectedTab

	const backgroundStyle = slide.background.image
		? { backgroundImage: `url("${slide.background.image.value}")` }
		: { background: returnGradientString(slide.background.color) }

	const clearSelectionObjectsOnClick = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			createClearObjectSelectionAction()
		}
	}

	useEffect(() => {
		const deleteOnClick = (e: KeyboardEvent) => {
			if (e.code === 'Delete') {
				createDeleteObjectAction(slideId, selection.objectId)
				createClearObjectSelectionAction()
			}
		}
		document.addEventListener('keydown', deleteOnClick)
		return () => {
			document.removeEventListener('keydown', deleteOnClick)
		}
	}, [selection])

	useEffect(() => {
		if (!isWorkspace) {
			return
		}

		setSlideRect && setSlideRect(ref.current.getBoundingClientRect())

		document.addEventListener('keydown', clearSelectionObjectsOnClick)
		return () => {
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
				previewMode ? styles.previewMode : null,
			)}
			ref={ref}
		>
			{slide.objects.map((obj, index) => {
				const newObj = structuredClone(obj)
				const selected = selection.objectId == obj.id && isWorkspace
				if (
					(previewMode && obj.id == slide.objects[currentObject].id) ||
					(obj.animation && selected && selectedTab == Tabs.ANIMATION)
				) {
					const index = !previewMode
						? obj.animation.findIndex((state) => state.id === selection.keyFrameId)
						: currentAnimation
					if (index !== -1) {
						newObj.baseState.width = obj.animation[index].state.width
						newObj.baseState.height = obj.animation[index].state.height
						newObj.baseState.rotation = obj.animation[index].state.rotation
						newObj.baseState.x = obj.animation[index].state.x
						newObj.baseState.y = obj.animation[index].state.y
					} else {
						newObj.baseState.width = obj.baseState.width
						newObj.baseState.height = obj.baseState.height
						newObj.baseState.rotation = obj.baseState.rotation
						newObj.baseState.x = obj.baseState.x
						newObj.baseState.y = obj.baseState.y
					}
				}
				return (
					<SlideElement
						key={index}
						object={newObj}
						isWorkspace={isWorkspace}
						slideId={slide.id}
						scale={scale}
						slideRef={isWorkspace ? ref : null}
					/>
				)
			})}
		</div>
	)
}

export { SlideRenderer }
