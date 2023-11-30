import styles from './WorkSpace.module.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import { Slide } from '../../types'
import { useContext } from 'react'
import { PresenterContext } from '../../presenterContext/PresenterContext'
import { ObjectSelection } from './ObjectSelection/ObjectSelection'

type WorkSpaceProps = {
	selectedSlide: Slide
}
function WorkSpace({ selectedSlide }: WorkSpaceProps) {
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2

	const { presenter, setPresenter } = useContext(PresenterContext)
	const { selection, presentation, operationHistory } = presenter

	const selectedObjects = selectedSlide.objects.filter((object) => {
		selection.objectsId.includes(object.id)
	})

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
					<ObjectSelection selectedObjects={selectedObjects} scale={scale} />
				</div>
			</div>
			<SlideList scale={scale} createOnClick={createOnClick} />
		</div>
	)
}

export { WorkSpace }
