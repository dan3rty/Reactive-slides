import { useAppActions, useAppSelector } from '../redux/hooks'
import { useEffect, useState } from 'react'
import {PlayerSlideRenderer} from "../common/Player/PlayerSlideRenderer";

function Player() {
	const { createEndPreviewAction } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const [currentSlide, setCurrentSlide] = useState(0)
	// const [currentAnimation, setCurrentAnimation] = useState(0)

	function handleKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowRight':
				if (currentSlide + 1 < slides.length) {
					setCurrentSlide(currentSlide + 1)
				}
				break
			case 'ArrowLeft':
				if (currentSlide > 0) {
					setCurrentSlide(currentSlide - 1)
				}
				break
			case 'Escape':
				document.exitFullscreen().then()
				break
			default:
				break
		}
	}

	function handleMouseDown() {
		if (currentSlide + 1 < slides.length) {
			setCurrentSlide(currentSlide + 1)
		}
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

	return <PlayerSlideRenderer slide={slides[currentSlide]}/>
}

export { Player }
