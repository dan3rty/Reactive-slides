import styles from './WorkSpace.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import { useAppActions, useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react'

function WorkSpace() {
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2 //TODO magical number

	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const selectedSlide = slides.find((slide) => slide.id === selection.slideId)
	const { createDeleteObjectAction, createClearObjectSelectionAction } = useAppActions()

	useEffect(() => {
		const deleteOnClick = (e: KeyboardEvent) => {
			if (e.code === 'Delete') {
				createClearObjectSelectionAction()
				createDeleteObjectAction(selection.objectsId)
			}
		}

		const clearSelectionObjectsOnClick = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				createClearObjectSelectionAction()
			}
		}

		document.addEventListener('keydown', deleteOnClick)
		document.addEventListener('keydown', clearSelectionObjectsOnClick)
		return () => {
			document.removeEventListener('keydown', deleteOnClick)
			document.removeEventListener('keydown', clearSelectionObjectsOnClick)
		}
	}, [])

	return (
		<div className={styles.workSpace}>
			<div>
				<BookMarks />
				{selectedSlide && (
					<SlideRenderer scale={scale} slideId={selectedSlide.id} isWorkspace={true} />
				)}
			</div>
			<SlideList scale={scale} />
		</div>
	)
}

export { WorkSpace }
