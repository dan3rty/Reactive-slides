import { useContext, useRef, useState } from 'react'
import { useDraggableList } from '../../../hooks/useDraggableList'
import styles from './SlideList.css'
import { Background, Color, GradientColor, Presenter, Selection, Slide, Tabs } from '../../../types'
import { PresenterContext } from '../../../App'
import { AddSlideButton } from './AddSlideButton/AddSlideButton'
import { SlidePreview } from './SlidePreview/SlidePreview'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

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
	const { createAddSlideAction, createChangeOrderSlidesAction, createDeleteSlideAction } =
		useAppActions()
	const { setPresenter } = useContext(PresenterContext)
	const { presentation, selection, operationHistory } = presenter
	const [chosen, setChosen] = useState(selection.slideId)
	const slides = useAppSelector((state) => state.slides)
	const { registerDndItem, unregisterDndItem } = useDraggableList({
		onOrderChange: createChangeOrderSlidesAction,
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
		createAddSlideAction(newSlide)
	}

	const deleteSlideOnClick = (slideId: string) => {
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
		createDeleteSlideAction(slideId)
		setPresenter({ presentation, selection: newSelection, operationHistory })
	}

	const slidesToRender: JSX.Element[] = slides.map((slide, index) => {
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
