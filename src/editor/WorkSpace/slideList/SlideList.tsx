import React, { useContext } from 'react'
import styles from './SlideList.module.css'
import { presentation } from '../../../App'
import { SlideEditor } from '../SlideEditor/SlideEditor'
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
					<SlideEditor scale={props.scale * 4} slide={slide}></SlideEditor>
					<Counter index={index + 1}></Counter>
				</div>
			)
		} else {
			return (
				<div className={styles.smallSlide}>
					<SlideEditor scale={props.scale * 4} slide={slide}></SlideEditor>
					<Counter index={index + 1}></Counter>
				</div>
			)
		}
	})

	return <div className={styles.slideList}>{slidesToRender}</div>
}

export { SlideList }
