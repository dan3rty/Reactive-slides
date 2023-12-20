import { useRef } from 'react'
import { useDraggableList } from '../../../hooks/useDraggableList'
import styles from './SlideList.css'
import { Background, Color, GradientColor, Slide } from '../../../types'
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
}

function SlideList({ scale }: SlideListProps) {
	const ref = useRef<HTMLDivElement>(null)
	const {
		createAddSlideAction,
		createChangeOrderSlidesAction,
		createDeleteSlideAction,
		createChangeSlideSelectionAction,
	} = useAppActions()
	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const { registerDndItem, unregisterDndItem } = useDraggableList({
		onOrderChange: createChangeOrderSlidesAction,
	})

	const createOnClick = (slideId: string) => {
		return () => {
			createChangeSlideSelectionAction(slideId)
		}
	}

	const createSlideOnClick = () => {
		const newSlide = generateBlankSlide()
		createAddSlideAction(newSlide)
	}

	const deleteSlideOnClick = (slideId: string) => {
		if (selection.slideId == slideId) {
			const deletedSlide = slides.find((slide) => slide.id === selection.slideId)
			let newSlideId = ''
			if (slides[slides.indexOf(deletedSlide) + 1]) {
				newSlideId = slides[slides.indexOf(deletedSlide) + 1].id
				createChangeSlideSelectionAction(newSlideId)
			} else if (slides[slides.indexOf(deletedSlide) - 1]) {
				newSlideId = slides[slides.indexOf(deletedSlide) - 1].id
				createChangeSlideSelectionAction(newSlideId)
			} else {
				createChangeSlideSelectionAction(newSlideId)
			}
		}
		createDeleteSlideAction(slideId)
	}

	const slidesToRender: JSX.Element[] = slides.map((slide, index) => {
		const isChosen = slide.id == selection.slideId
		const slideScale = isChosen ? scale * 3.5 : scale * 4
		const showDeleteButton = slides.length !== 1

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
				showDeleteButton={showDeleteButton}
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
