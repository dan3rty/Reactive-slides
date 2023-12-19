import styles from './Slider.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

type useDraggableSliderDotProps = {
	elementRef: MutableRefObject<HTMLDivElement>
	parentRef: MutableRefObject<HTMLDivElement>
	onSliderChange: (position: string) => void
}

function useDraggableSliderDot({
	elementRef,
	parentRef,
	onSliderChange,
}: useDraggableSliderDotProps) {
	let sliderWidth = 0
	const [dotPosition, setDotPosition] = useState('0%')

	useEffect(() => {
		sliderWidth = parentRef.current ? parentRef.current.getBoundingClientRect().width : 0
		elementRef.current.addEventListener('mousedown', startMoving)
	}, [])

	function moving(e: MouseEvent) {
		const dx = e.clientX - parentRef.current.getBoundingClientRect().x
		const offset = dx < 0 ? '0%' : dx > sliderWidth ? '100%' : `${(dx / sliderWidth) * 100}%`
		setDotPosition(offset)
		onSliderChange(offset)
	}

	function stopMoving() {
		document.removeEventListener('mousemove', moving)
		document.removeEventListener('mouseup', stopMoving)
		elementRef.current.addEventListener('mousedown', startMoving)
	}

	function startMoving() {
		elementRef.current.removeEventListener('mousedown', startMoving)
		document.addEventListener('mousemove', moving)
		document.addEventListener('mouseup', stopMoving)
	}

	return dotPosition
}

type SliderProps = {
	onSliderChange: (position: string) => void
}

function Slider(props: SliderProps) {
	const sliderRef = useRef<HTMLDivElement>(null)
	const sliderDotRef = useRef<HTMLDivElement>(null)
	const dotPosition = useDraggableSliderDot({
		elementRef: sliderDotRef,
		parentRef: sliderRef,
		onSliderChange: props.onSliderChange,
	})
	return (
		<div className={styles.slider} ref={sliderRef}>
			<div
				className={styles.sliderDot}
				ref={sliderDotRef}
				style={{
					left: dotPosition,
				}}
			></div>
		</div>
	)
}

export { Slider }
