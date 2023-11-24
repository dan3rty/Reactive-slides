import React, {useContext} from 'react'
import styles from './WorkSpace.module.css'
import { BookMarks } from './BookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './SlideList/SlideList'
import { PresenterContext } from '../../App'
import {Slide} from "../../types";

type WorkSpaceProps = {
	selectedSlide: Slide
}
function WorkSpace(props: WorkSpaceProps) {
	const context = useContext(PresenterContext).presenter
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2
	return (
		<div className={styles.workSpace}>
			<div>
				<BookMarks></BookMarks>
				<div className={styles.slideEditorWrapper}>
					<SlideRenderer
						scale={scale}
						slide={props.selectedSlide}
						selection={context.selection}
					></SlideRenderer>
				</div>
			</div>
			<SlideList scale={scale}></SlideList>
		</div>
	)
}

export { WorkSpace }
