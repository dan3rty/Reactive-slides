import { useContext, useState } from 'react'
import styles from './SlideList.module.css'
import { PresenterContext } from '../../../App'
import { SlideRenderer } from '../../../common/SlideEditor/SlideRenderer'
import { Counter } from './Counter/Counter'
import { joinCssClasses } from '../../../classes/joinCssClasses'
import { Selection, Slide } from '../../../types'

type SlideListProps = {
	scale: number
}
function SlideList({ scale }: SlideListProps) {
	const { presenter, setPresenter } = useContext(PresenterContext)
	const { presentation, selection, operationHistory } = presenter
	const slides: Array<Slide> = presentation.slides
	const [chosen, setChosen] = useState(selection.slideId)

	const createOnClick = (slideId: string) => {
		return () => {
			setChosen(slideId)
			const newSelection: Selection = {
				...selection,
				slideId,
			}
			setPresenter({ presentation, selection: newSelection, operationHistory })
		}
	}

	const slidesToRender = slides.map((slide, index) => {
		const isChosen = slide.id == chosen
		const slideScale = isChosen ? scale * 3.5 : scale * 4

		return (
			<div
				key={index}
				className={joinCssClasses(
					styles.smallSlide,
					isChosen ? styles.smallSlideChosen : null,
				)}
				onClick={createOnClick(slide.id)}
			>
				<SlideRenderer scale={slideScale} slide={slide}></SlideRenderer>
				<Counter index={index + 1}></Counter>
			</div>
		)
	})

	return <div className={styles.slideList}>{slidesToRender}</div>
}

export { SlideList }
