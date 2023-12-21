import { useRef } from 'react'
import { useDraggableList } from '../../../hooks/useDraggableList'
import styles from './SlideList.css'
import { AddSlideButton } from './AddSlideButton/AddSlideButton'
import { SlidePreview } from './SlidePreview/SlidePreview'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

type SlideListProps = {
	scale: number
}

function SlideList({ scale }: SlideListProps) {
	const ref = useRef<HTMLDivElement>(null)
	const {
		createAddSlideAction,
		createChangeOrderSlidesAction,
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
		createAddSlideAction()
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
				createOnClick={createOnClick}
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
