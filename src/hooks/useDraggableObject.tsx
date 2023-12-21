import { MutableRefObject, useEffect } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

type useDraggableObjectProps = {
	elementRef: MutableRefObject<HTMLElement | SVGSVGElement>
	elementId: string
	slideId: string
}

function useDraggableObject({ elementRef, elementId, slideId }: useDraggableObjectProps) {
	const { createChangeObjectAction } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const size = window.innerHeight //TODO: Я думаю, что высчитывание размеров можно вынести в common функцию
	const scale = (1080 / (size - 205)) * 1.2 //TODO: remove magical number
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
	}

	function stopMoving(e: MouseEvent) {
		document.removeEventListener('mousemove', moving)
		document.removeEventListener('mouseup', stopMoving)
		elementRef.current.addEventListener('mousedown', (event: Event) =>
			startMoving(event as MouseEvent),
		)
		const dx = e.clientX - baseMousePosition.x
		const dy = e.clientY - baseMousePosition.y
		const newBaseState = {
			...obj.baseState,
			width: elementRef.current.clientWidth * scale,
			height: elementRef.current.clientHeight * scale,
			x: (baseObjPosition.x + dx) * scale,
			y: (baseObjPosition.y + dy) * scale,
		}
		createChangeObjectAction(slideId, obj.id, {
			baseState: newBaseState,
		})
	}

	function startMoving(e: MouseEvent) {
		baseMousePosition = { x: e.clientX, y: e.clientY }
		baseObjPosition = {
			x: parseFloat(elementRef.current.parentElement.parentElement.style.left),
			y: parseFloat(elementRef.current.parentElement.parentElement.style.top),
		}
		elementRef.current.removeEventListener('mousedown', (event: Event) =>
			startMoving(event as MouseEvent),
		)
		document.addEventListener('mousemove', moving)
		document.addEventListener('mouseup', stopMoving)
	}

	useEffect(() => {
		if (elementRef.current) {
			elementRef.current.addEventListener('mousedown', (event: Event) =>
				startMoving(event as MouseEvent),
			)
		}
		return () => {
			if (elementRef.current) {
				elementRef.current.removeEventListener('mousedown', (event: Event) =>
					startMoving(event as MouseEvent),
				)
			}
		}
	}, [])
}

export { useDraggableObject }
