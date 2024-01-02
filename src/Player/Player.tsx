import { useAppActions, useAppSelector } from '../redux/hooks'
import { SlideRenderer } from '../common/SlideEditor/SlideRenderer'
import { useEffect, useState } from 'react'

function Player() {
	const { createEndPreviewAction } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const windowHeight = window.innerHeight
	const scale = 1080 / windowHeight
	const [currentSlide, setCurrentSlide] = useState(0)

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

	function handleFullscreen() {
		if (!document.fullscreenElement) {
			createEndPreviewAction()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	useEffect(() => {
		document.addEventListener('fullscreenchange', handleFullscreen)
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreen)
		}
	}, [handleFullscreen])

	return (
		<div>
			<SlideRenderer scale={scale} slideId={slides[currentSlide].id} isWorkspace={false} />
		</div>
	)
}

export { Player }
