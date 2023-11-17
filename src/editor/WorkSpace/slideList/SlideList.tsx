import React, { useContext } from 'react'
import styles from './SlideList.module.css'
import { presentation } from '../../../App'
import { SlideRenderer } from '../../../common/SlideEditor/SlideRenderer'
import { Counter } from './counter/Counter'

type SlideListProps = {
	scale: number
}
function SlideList(props: SlideListProps) {
	const slides = useContext(presentation).presentation.slides
	const chosen = useContext(presentation).selection.slideId
	const slidesToRender = slides.map((slide, index) => {
		if (slide.id == chosen) {
			return (
				<div className={styles.smallSlideChosen}>
					<SlideRenderer scale={props.scale * 3.5} slide={slide}></SlideRenderer>
					<Counter index={index + 1}></Counter>
				</div>
			)
		} else {
			return (
				<div className={styles.smallSlide}>
					<SlideRenderer scale={props.scale * 4} slide={slide}></SlideRenderer>
					<Counter index={index + 1}></Counter>
				</div>
			)
		}
	})

	return <div className={styles.slideList}>{slidesToRender}</div>
}

export { SlideList }
