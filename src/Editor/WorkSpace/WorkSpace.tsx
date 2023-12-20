import styles from './WorkSpace.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import { useAppActions, useAppSelector } from '../../redux/hooks'

function WorkSpace() {
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2 //TODO magical number

	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const selectedSlide = slides.find((slide) => slide.id === selection.slideId)
	const {
		createAddObjectSelectionAction,
		createDeleteObjectAction,
		createClearObjectSelectionAction,
	} = useAppActions()

	const createOnClick = (objectId: string) => {
		return () => {
			if (selection.objectsId.includes(objectId)) {
				return
			}
			createAddObjectSelectionAction(objectId)
		}
	}

	document.addEventListener('keydown', (e) => {
		//TODO вынести в useEfffect с отпиской
		if (e.code === 'Delete') {
			createClearObjectSelectionAction()
			createDeleteObjectAction(selection.objectsId)
		}
	})
	return (
		<div className={styles.workSpace}>
			<div>
				<BookMarks />
				{selectedSlide && (
					<div className={styles.slideEditorWrapper}>
						{' '}
						//TODO выпилить
						<SlideRenderer
							scale={scale}
							slideId={selectedSlide.id}
							isWorkspace={true}
							selection={selection}
							createOnClick={createOnClick}
						/>
					</div>
				)}
			</div>
			<SlideList scale={scale} createOnClick={createOnClick} />
		</div>
	)
}

export { WorkSpace }
