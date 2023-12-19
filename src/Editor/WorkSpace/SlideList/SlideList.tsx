import { useContext, useRef, useState } from 'react'
import { useDraggableList } from '../../../hooks/useDraggableList'
import styles from './SlideList.css'
import {
	Background,
	Color,
	GradientColor,
	Presentation,
	Presenter,
	Selection,
	Slide,
	Tabs,
} from '../../../types'
import { PresenterContext } from '../../../App'
import { AddSlideButton } from './AddSlideButton/AddSlideButton'
import { SlidePreview } from './SlidePreview/SlidePreview'

function generateBlankSlide() {
	const gradientColor: Color = {
		hsl: '#FFFFFF',
		opacity: 0,
		percent: '100%',
	}
	const backgroundGradient: GradientColor = {
		colors: [gradientColor],
		rotation: 15,
	}
	const background: Background = {
		color: backgroundGradient,
	}
	const newSlide: Slide = {
		id: Math.random().toString(16).slice(2),
		background: background,
		objects: [],
	}
	return newSlide
}

type SlideListProps = {
	scale: number
	createOnClick: (objectId: string) => () => void
	presenter: Presenter
}
function SlideList({ scale, presenter }: SlideListProps) {
	const ref = useRef<HTMLDivElement>(null)
	const { setPresenter } = useContext(PresenterContext)
	const { presentation, selection, operationHistory } = presenter
	const slides: Array<Slide> = presentation.slides
	const [chosen, setChosen] = useState(selection.slideId)
	const { registerDndItem, unregisterDndItem } = useDraggableList({
		onOrderChange: (from, to) => {
			const newSlides = [...slides]
			const removed = newSlides.splice(from, 1)
			newSlides.splice(to, 0, removed[0])
			const newPresentation: Presentation = {
				...presentation,
				slides: newSlides,
			}
			setPresenter({ presentation: newPresentation, selection, operationHistory })
		},
	})

	const createOnClick = (slideId: string) => {
		return () => {
			setChosen(slideId)
			const newSelection: Selection = {
				selectedTab: Tabs.CREATE,
				objectsId: [],
				slideId,
			}
			setPresenter({ presentation, selection: newSelection, operationHistory })
		}
	}

	const createSlideOnClick = () => {
		const newSlide = generateBlankSlide()
		const oldSlides = presentation.slides
		const newPresentation: Presentation = {
			...presentation,
			slides: oldSlides.concat(newSlide),
		}
		const newSelection = { ...selection, slideId: newSlide.id }
		setPresenter({ presentation: newPresentation, selection: newSelection, operationHistory })
	}

	const deleteSlideOnClick = (slideId: string) => {
		const newSlides: Array<Slide> = presenter.presentation.slides.filter(
			(newSlide) => newSlide.id != slideId,
		)
		const newSelection = { ...selection }
		if (selection.slideId == slideId) {
			const deletedSlide = slides.find((slide) => slide.id === selection.slideId)
			if (slides[slides.indexOf(deletedSlide) + 1]) {
				newSelection.slideId = slides[slides.indexOf(deletedSlide) + 1].id
			} else if (slides[slides.indexOf(deletedSlide) - 1]) {
				newSelection.slideId = slides[slides.indexOf(deletedSlide) - 1].id
			} else {
				newSelection.slideId = undefined
			}
		}
		const newPresentation: Presentation = {
			...presentation,
			slides: newSlides,
		}
		setPresenter({ presentation: newPresentation, selection: newSelection, operationHistory })
	}

	const slidesToRender = slides.map((slide, index) => {
		const isChosen = slide.id == chosen
		const slideScale = isChosen ? scale * 3.5 : scale * 4

		return (
			<SlidePreview
				registerDndItem={registerDndItem}
				unregisterDndItem={unregisterDndItem}
				key={index}
				index={index}
				scale={slideScale}
				slide={slide}
				selection={selection}
				createOnClick={createOnClick}
				deleteOnClick={() => deleteSlideOnClick(slide.id)}
			></SlidePreview>
		)
	})

	return (
		<div ref={ref} className={styles.slideList}>
			{slidesToRender}
			<AddSlideButton scale={scale * 4} createSlideOnClick={createSlideOnClick} />
		</div>
	)
}

export { SlideList }
