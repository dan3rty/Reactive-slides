import { RefObject, useContext, useEffect } from 'react'
import { PresenterContext } from '../presenterContext/PresenterContext'
import { Presenter, Slide } from '../types'

type useDraggableObjectProps = {
	elementRef: RefObject<HTMLElement>
	elementId: string
	slideId: string
}
function useDraggableObject(props: useDraggableObjectProps) {
	const { presenter, setPresenter, editedSlideRef } = useContext(PresenterContext)
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2
	let basePosition = { x: 0, y: 0 }
	function moving(e) {
		let obj = presenter.presentation.slides
			.find((slide) => slide.id === props.slideId)
			.objects.find((object) => object.id === props.elementId)
		const rect = editedSlideRef.current.getBoundingClientRect()
		const dx = (e.clientX - basePosition.x - rect.x) * scale - obj.baseState.x
		const dy = (e.clientY - basePosition.y - rect.y) * scale - obj.baseState.y
		console.log(
			basePosition.x,
			basePosition.y,
			(e.clientX - basePosition.x - rect.x) * scale - obj.baseState.x,
			(e.clientY - basePosition.y - rect.y) * scale - obj.baseState.y,
		)
		obj = {
			...obj,
			baseState: {
				...obj.baseState,
				x: obj.baseState.x + dx,
				y: obj.baseState.y + dy,
			},
		}
		const slideIndex = presenter.presentation.slides.findIndex(
			(slide) => slide.id === props.slideId,
		)
		const newSlide: Slide = {
			...presenter.presentation.slides[slideIndex],
			objects: presenter.presentation.slides[slideIndex].objects.map((object) => {
				if (object.id === props.elementId) {
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
		props.elementRef.current.addEventListener('mousedown', startMoving)
	}
	function startMoving(e) {
		basePosition = { x: e.clientX / scale, y: e.clientY / scale }
		props.elementRef.current.removeEventListener('mousedown', startMoving)
		editedSlideRef.current.addEventListener('mousemove', moving)
		editedSlideRef.current.addEventListener('mouseup', stopMoving)
	}
	useEffect(() => {
		if (props.elementRef.current) {
			props.elementRef.current.addEventListener('mousedown', startMoving)
		}
	}, [])
}

export { useDraggableObject }
