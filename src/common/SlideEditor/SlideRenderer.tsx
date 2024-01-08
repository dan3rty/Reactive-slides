import styles from './SlideRenderer.css'
import { Tabs } from '../../model/types'
import { returnGradientString } from '../Tools/returnGradientString'
import React, { useEffect, useRef } from 'react'
import { SlideElement } from './SlideElement'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { joinCssClasses } from '../../classes/joinCssClasses'
import { getScaledSlideSize } from '../Tools/getSlideSize'

type SlideRendererProps = {
	scale: number
	slideId: string
	isWorkspace: boolean
	setSlideRect?: React.Dispatch<React.SetStateAction<DOMRect>>
}

function SlideRenderer({ scale, slideId, isWorkspace, setSlideRect }: SlideRendererProps) {
	const { width, height } = getScaledSlideSize(scale)
	const ref = useRef(null)
	const { createDeleteObjectAction, createClearObjectSelectionAction } = useAppActions()
	const previewMode = useAppSelector((state) => state.previewMode)
	const selection = useAppSelector((state) => state.selection)

	const slides = useAppSelector((state) => state).presentation.slides
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
				console.log(selection)
				const selected = selection.objectId == obj.id && isWorkspace
				if (obj.animation && selected && selectedTab == Tabs.ANIMATION) {
					const index = obj.animation.stateList.findIndex(
						state => state.id === selection.keyFrameId,
					)
					if (index !== -1) {
						newObj.baseState.width = obj.animation.stateList[index].state.width
						newObj.baseState.height = obj.animation.stateList[index].state.height
						newObj.baseState.rotation = obj.animation.stateList[index].state.rotation
						newObj.baseState.x = obj.animation.stateList[index].state.x
						newObj.baseState.y = obj.animation.stateList[index].state.y
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
						isPlayer={false}
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
