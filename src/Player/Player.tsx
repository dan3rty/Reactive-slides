import { useAppActions, useAppSelector } from '../redux/hooks'
import { SlideRenderer } from '../common/SlideEditor/SlideRenderer'
import { useEffect, useState } from 'react'

function Player() {
	const { createEndPreviewAction } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const windowHeight = window.innerHeight
	const scale = 1080 / windowHeight
	const [currentSlide, setCurrentSlide] = useState(0)
	const [currentAnimation, setCurrentAnimation] = useState(-1)
	const [currentObject, setCurrentObject] = useState(0)

	const nextStep = () => {
		if (slides[currentSlide].objects[currentObject].animation?.length > currentAnimation + 1) {
			setCurrentAnimation(currentAnimation + 1)
		} else if (slides[currentSlide].objects.length > currentObject + 1) {
			setCurrentAnimation(-1)
			setCurrentObject(currentObject + 1)
		} else if (currentSlide + 1 < slides.length) {
			setCurrentAnimation(-1)
			setCurrentObject(0)
			setCurrentSlide(currentSlide + 1)
		}
	}

	const prevStep = () => {
		if (currentAnimation > -1) {
			setCurrentAnimation(currentAnimation - 1)
		} else if (currentObject > 0) {
			const animation = slides[currentSlide].objects[currentObject - 1].animation
			setCurrentAnimation(animation ? animation.length - 1 : -1)
			setCurrentObject(currentObject - 1)
		} else if (currentSlide > 0) {
			const animation =
				slides[currentSlide - 1].objects[slides[currentSlide - 1].objects.length - 1]
					.animation
			setCurrentAnimation(animation ? animation.length - 1 : -1)
			setCurrentObject(slides[currentSlide - 1].objects.length - 1)
			setCurrentSlide(currentSlide - 1)
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowRight':
				nextStep()
				break
			case 'ArrowLeft':
				prevStep()
				break
			case 'Escape':
				document.exitFullscreen()
				break
			default:
				break
		}
	}

	function handleMouseDown() {
		nextStep()
	}

	function handleFullscreen() {
		if (!document.fullscreenElement) {
			createEndPreviewAction()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleMouseDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [handleKeyDown, handleMouseDown])

	useEffect(() => {
		document.addEventListener('fullscreenchange', handleFullscreen)
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreen)
		}
	}, [handleFullscreen])

	return (
		<SlideRenderer
			scale={scale}
			slideId={slides[currentSlide].id}
			isWorkspace={false}
			currentObject={currentObject}
			currentAnimation={currentAnimation}
		/>
	)
}

export { Player }
