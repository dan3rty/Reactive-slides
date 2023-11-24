import { useContext } from 'react'
import styles from './SlideList.module.css'
import { PresenterContext } from '../../../App'
import { SlideRenderer } from '../../../common/SlideEditor/SlideRenderer'
import { Counter } from './Counter/Counter'

type SlideListProps = {
	scale: number
}
function SlideList(props: SlideListProps) {
	const slides = useContext(PresenterContext).presenter.presentation.slides
	const chosen = useContext(PresenterContext).presenter.selection.slideId
	const slidesToRender = slides.map((slide, index) => {
		if (slide.id == chosen) {
			return (
				<div key={index} className={styles.smallSlideChosen}>
					<SlideRenderer scale={props.scale * 3.5} slide={slide}></SlideRenderer>
					<Counter index={index + 1}></Counter>
				</div>
			)
		} else {
			return (
				<div key={index} className={styles.smallSlide}>
					<SlideRenderer scale={props.scale * 4} slide={slide}></SlideRenderer>
					<Counter index={index + 1}></Counter>
				</div>
			)
		}
	})

	return <div className={styles.slideList}>{slidesToRender}</div>
}

export { SlideList }
