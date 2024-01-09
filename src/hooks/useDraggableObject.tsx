import { MutableRefObject } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

type useDraggableObjectProps = {
	elementRef: MutableRefObject<HTMLElement | SVGSVGElement>
	elementId: string
	slideId: string
}

const SLIDE_HEIGHT = 1080
const TOOLBAR_HEIGHT = 205
const WORKSPACE_SCALER = 1.2

function useDraggableObject({ elementRef, elementId, slideId }: useDraggableObjectProps) {
	const { createChangeObjectAction, createMoveObjectToTopLayer } = useAppActions()
	const presenter = useAppSelector((state) => state)
	const slides = presenter.presentation.slides
	const selection = presenter.selection
	const size = window.innerHeight
	const scale = (SLIDE_HEIGHT / (size - TOOLBAR_HEIGHT)) * WORKSPACE_SCALER
	const obj = slides
		.find((slide) => slide.id === slideId)
		.objects.find((object) => object.id === elementId)
	let baseObjPosition = { x: 0, y: 0 }
	let baseMousePosition = { x: 0, y: 0 }

	function moving(e: MouseEvent) {
		const dx = e.clientX - baseMousePosition.x
		const dy = e.clientY - baseMousePosition.y
		elementRef.current.parentElement.parentElement.style.left = baseObjPosition.x + dx + 'px'
		elementRef.current.parentElement.parentElement.style.top = baseObjPosition.y + dy + 'px'
		elementRef.current.parentElement.parentElement.style.zIndex = '1'
	}

	const stopMoving = (e: MouseEvent) => {
		document.removeEventListener('mousemove', moving)
		document.removeEventListener('mouseup', stopMoving)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		elementRef.current.addEventListener('mousedown', startMoving)
		const dx = e.clientX - baseMousePosition.x
		const dy = e.clientY - baseMousePosition.y
		const newState = {
			...obj.baseState,
			x: (baseObjPosition.x + dx) * scale,
			y: (baseObjPosition.y + dy) * scale,
		}

		if (elementRef.current.clientWidth) {
			newState.width = elementRef.current.clientWidth * scale
		}

		if (elementRef.current.clientHeight) {
			newState.height = elementRef.current.clientHeight * scale
		}

		createMoveObjectToTopLayer(slideId, obj.id)
		console.log(selection.keyFrameId)
		if (!selection.keyFrameId) {
			createChangeObjectAction(slideId, elementId, {
				baseState: newState,
			})
		} else {
			const newStateList = obj.animation.stateList.map((state) => {
				if (state.id === selection.keyFrameId) {
					return {
						...state,
						state: newState,
					}
				}
				return state
			})
			createChangeObjectAction(slideId, elementId, {
				animation: {
					...obj.animation,
					stateList: newStateList,
				},
			})
		}

		elementRef.current.parentElement.parentElement.style.zIndex = '0'
	}

	const startMoving = (e: MouseEvent) => {
		baseMousePosition = { x: e.clientX, y: e.clientY }
		baseObjPosition = {
			x: parseFloat(elementRef.current.parentElement.parentElement.style.left),
			y: parseFloat(elementRef.current.parentElement.parentElement.style.top),
		}
		document.addEventListener('mousemove', moving)
		document.addEventListener('mouseup', stopMoving)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		elementRef.current.removeEventListener('mousedown', startMoving)
	}

	return { startMoving }
}

export { useDraggableObject }
