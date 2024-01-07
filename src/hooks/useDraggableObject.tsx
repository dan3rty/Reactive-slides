import { MutableRefObject } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

type useDraggableObjectProps = {
	elementRef: MutableRefObject<HTMLElement | SVGSVGElement>
	elementId: string
	slideId: string
	keyframeId?: string
}

const SLIDE_HEIGHT = 1080
const TOOLBAR_HEIGHT = 205
const WORKSPACE_SCALER = 1.2

function useDraggableObject({
	elementRef,
	elementId,
	slideId,
	keyframeId,
}: useDraggableObjectProps) {
	const { createChangeObjectAction, createMoveObjectToTopLayer } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const size = window.innerHeight //TODO: Я думаю, что высчитывание размеров можно вынести в common функцию
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
		elementRef.current.addEventListener('mousedown', (event: Event) =>
			startMoving(event as MouseEvent),
		)
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
		if (!keyframeId) {
			createChangeObjectAction(slideId, elementId, {
				baseState: newState,
			})
		} else {
			const newAnimation = obj.animation.map((state) => {
				if (state.id === keyframeId) {
					return {
						...state,
						state: newState,
					}
				}
				return state
			})
			createChangeObjectAction(slideId, elementId, {
				animation: newAnimation,
			})
		}

		elementRef.current.parentElement.parentElement.style.zIndex = '0'
	}

	function startMoving(e: MouseEvent) {
		baseMousePosition = { x: e.clientX, y: e.clientY }
		baseObjPosition = {
			x: parseFloat(elementRef.current.parentElement.parentElement.style.left),
			y: parseFloat(elementRef.current.parentElement.parentElement.style.top),
		}
		elementRef.current?.removeEventListener('mousedown', (event: Event) =>
			startMoving(event as MouseEvent),
		)
		document.addEventListener('mousemove', moving)
		document.addEventListener('mouseup', stopMoving)
	}

	return { startMoving }
}

export { useDraggableObject }
