import { MutableRefObject, useContext, useEffect } from 'react'
import { PresenterContext } from '../presenterContext/PresenterContext'
import { useAppActions, useAppSelector } from '../redux/hooks'

type useDraggableObjectProps = {
	elementRef: MutableRefObject<HTMLElement | SVGSVGElement>
	elementId: string
	slideId: string
}

function useDraggableObject({ elementRef, elementId, slideId }: useDraggableObjectProps) {
	const { createChangeObjectAction } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const { editedSlideRef } = useContext(PresenterContext)
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2
	let obj = slides
		.find((slide) => slide.id === slideId)
		.objects.find((object) => object.id === elementId)
	let baseObjPosition = { x: 0, y: 0 }
	let baseMousePosition = { x: 0, y: 0 }
	function moving(e: MouseEvent) {
		const dx = e.clientX - baseMousePosition.x
		const dy = e.clientY - baseMousePosition.y
		obj = {
			...obj,
			baseState: {
				...obj.baseState,
				width: elementRef.current.clientWidth * scale,
				height: elementRef.current.clientHeight * scale,
				x: baseObjPosition.x + dx * scale,
				y: baseObjPosition.y + dy * scale,
			},
		}
		console.log(elementRef.current.parentElement.parentElement)
		elementRef.current.parentElement.parentElement.style.left = baseObjPosition.x + dx + 'px'
		elementRef.current.parentElement.parentElement.style.top = baseObjPosition.y + dy + 'px'
		createChangeObjectAction(obj.id, obj) //TODO на дроп, менять объекты на уровне action
	}

	function stopMoving() {
		document.removeEventListener('mousemove', moving)
		editedSlideRef.current.removeEventListener('mouseup', stopMoving)
		elementRef.current.addEventListener('mousedown', startMoving)
	}

	function startMoving(e: MouseEvent) {
		baseMousePosition = { x: e.clientX, y: e.clientY }
		baseObjPosition = {
			x: parseFloat(elementRef.current.parentElement.parentElement.style.left),
			y: parseFloat(elementRef.current.parentElement.parentElement.style.top),
		}
		elementRef.current.removeEventListener('mousedown', startMoving)
		document.addEventListener('mousemove', moving)
		editedSlideRef.current.addEventListener('mouseup', stopMoving) //TODO Заменить на документ
	}

	useEffect(() => {
		if (elementRef.current) {
			elementRef.current.addEventListener('mousedown', startMoving)
		}
		return () => {
			if (elementRef.current) {
				elementRef.current.removeEventListener('mousedown', startMoving)
			}
		}
	}, [])
}

export { useDraggableObject }
