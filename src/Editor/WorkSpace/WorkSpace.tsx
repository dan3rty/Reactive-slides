import styles from './WorkSpace.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import { useAppSelector } from '../../redux/hooks'
import React from 'react'

type WorkSpaceProps = {
	setSlideRect: React.Dispatch<React.SetStateAction<DOMRect>>
	setSlideRefList: React.Dispatch<React.SetStateAction<React.MutableRefObject<HTMLDivElement[]>>>
	slideRefList: React.MutableRefObject<HTMLDivElement[]>
}

const SLIDE_HEIGHT = 1080
const TOOLBAR_HEIGHT = 205
const WORKSPACE_SCALER = 1.2
function WorkSpace({ setSlideRect, setSlideRefList, slideRefList }: WorkSpaceProps) {
	const size = window.innerHeight
	const scale = (SLIDE_HEIGHT / (size - TOOLBAR_HEIGHT)) * WORKSPACE_SCALER

	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state).presentation.slides
	const selectedSlide = slides.find((slide) => slide.id === selection.slideId)

	return (
		<div className={styles.workSpace}>
			<div>
				<BookMarks />
				{selectedSlide && (
					<SlideRenderer
						setSlideRect={setSlideRect}
						scale={scale}
						slideId={selectedSlide.id}
						isWorkspace={true}
					/>
				)}
			</div>
			<SlideList
				scale={scale}
				setSlideRefList={setSlideRefList}
				slideRefList={slideRefList}
			/>
		</div>
	)
}

export { WorkSpace }
