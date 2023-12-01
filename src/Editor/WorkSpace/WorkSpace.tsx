import styles from './WorkSpace.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import {Presenter, Selection, Slide} from '../../types'
import { useContext } from 'react'
import { PresenterContext } from '../../presenterContext/PresenterContext'

type WorkSpaceProps = {
	selectedSlide: Slide
}

function WorkSpace({ selectedSlide }: WorkSpaceProps) {
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2

	const { presenter, setPresenter} = useContext(PresenterContext)
	const { selection, presentation, operationHistory } = presenter

	const createOnClick = (objectId: string) => {
		return () => {
			if (selection.objectsId.includes(objectId)) {
				return
			}
			const newObjectsId = selection.objectsId.concat(objectId)
			const newSelection: Selection = {
				...selection,
				objectsId: newObjectsId,
			}
			setPresenter({ presentation, selection: newSelection, operationHistory })
		}
	}

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Delete') {
			const slideIndex = presenter.presentation.slides.findIndex(slide => slide.id === presenter.selection.slideId)
			const newSlide: Slide = {
				...presenter.presentation.slides[slideIndex],
				objects: presenter.presentation.slides[slideIndex].objects.filter(obj => !presenter.selection.objectsId.includes(obj.id))
			}
			const newSlides: Array<Slide> = presenter.presentation.slides
			newSlides[slideIndex] = newSlide
			const newPresenter: Presenter = {
				...presenter,
				selection: {
					...selection,
					objectsId: []
				},
				presentation: {
					...presentation,
					slides: newSlides,
				}
			}
			setPresenter(newPresenter)
		}
	})
	return (
		<div className={styles.workSpace}>
			<div>
				<BookMarks selection={selection} />
				<div className={styles.slideEditorWrapper}>
					<SlideRenderer
						scale={scale}
						slide={selectedSlide}
						isWorkspace={true}
						selection={selection}
						createOnClick={createOnClick}
					/>
				</div>
			</div>
			<SlideList scale={scale} createOnClick={createOnClick} />
		</div>
	)
}

export { WorkSpace }
