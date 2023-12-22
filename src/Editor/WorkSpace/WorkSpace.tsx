import styles from './WorkSpace.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import { useAppSelector } from '../../redux/hooks'

const SLIDE_HEIGHT = 1080
const TOOLBAR_HEIGHT = 205
const WORKSPACE_SCALER = 1.2
function WorkSpace() {
	const size = window.innerHeight
	const scale = (SLIDE_HEIGHT / (size - TOOLBAR_HEIGHT)) * WORKSPACE_SCALER //TODO magical number

	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const selectedSlide = slides.find((slide) => slide.id === selection.slideId)

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
