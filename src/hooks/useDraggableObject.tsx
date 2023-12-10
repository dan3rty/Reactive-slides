import { MutableRefObject, useContext, useEffect } from 'react'
import { PresenterContext } from '../presenterContext/PresenterContext'
import { Presenter, Slide } from '../types'

type useDraggableObjectProps = {
	elementRef: MutableRefObject<HTMLElement | SVGSVGElement>
	elementId: string
	slideId: string
}

function useDraggableObject({ elementRef, elementId, slideId }: useDraggableObjectProps) {
	const { presenter, setPresenter, editedSlideRef } = useContext(PresenterContext)
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2
	let obj = presenter.presentation.slides
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
				x: baseObjPosition.x + dx * scale,
				y: baseObjPosition.y + dy * scale,
			},
		}
		const slideIndex = presenter.presentation.slides.findIndex((slide) => slide.id === slideId)
		const newSlide: Slide = {
			...presenter.presentation.slides[slideIndex],
			objects: presenter.presentation.slides[slideIndex].objects.map((object) => {
				if (object.id === elementId) {
					return obj
				} else {
					return object
				}
			}),
		}
		const newSlides: Array<Slide> = presenter.presentation.slides
		newSlides[slideIndex] = newSlide
		const newPresenter: Presenter = {
			...presenter,
			presentation: {
				...presenter.presentation,
				slides: newSlides,
			},
		}
		setPresenter(newPresenter)
	}

	function stopMoving() {
		editedSlideRef.current.removeEventListener('mousemove', moving)
		editedSlideRef.current.removeEventListener('mouseup', stopMoving)
		elementRef.current.addEventListener('mousedown', startMoving)
	}

	function startMoving(e) {
		baseMousePosition = { x: e.clientX, y: e.clientY }
		baseObjPosition = { x: obj.baseState.x, y: obj.baseState.y }
		elementRef.current.removeEventListener('mousedown', startMoving)
		editedSlideRef.current.addEventListener('mousemove', moving)
		editedSlideRef.current.addEventListener('mouseup', stopMoving)
	}

	useEffect(() => {
		if (elementRef.current) {
			elementRef.current.addEventListener('mousedown', startMoving)
		}
	}, [])
}

export { useDraggableObject }
