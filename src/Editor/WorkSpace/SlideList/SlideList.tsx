import { ReactElement, useRef } from 'react'
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
	const { createChangeOrderSlidesAction } = useAppActions()
	const slides = useAppSelector((state) => state).presentation.slides
	const { registerDndItem, unregisterDndItem } = useDraggableList({
		onOrderChange: createChangeOrderSlidesAction,
	})

	const slidesToRender: ReactElement[] = slides.map((slide, index) => {
		const slideScale = scale * 4
		const showDeleteButton = slides.length !== 1

		return (
			<SlidePreview
				slideId={slide.id}
				registerDndItem={registerDndItem}
				unregisterDndItem={unregisterDndItem}
				key={index}
				index={index}
				scale={slideScale}
				showDeleteButton={showDeleteButton}
			></SlidePreview>
		)
	})

	return (
		<div ref={ref} className={styles.slideList}>
			{slidesToRender}
			<AddSlideButton scale={scale * 4} />
		</div>
	)
}

export { SlideList }
