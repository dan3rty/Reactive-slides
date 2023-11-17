import React, { useContext } from 'react'
import styles from './WorkSpace.module.css'
import { BookMarks } from './bookMarks/BookMarks'
import { SlideRenderer } from '../../common/SlideEditor/SlideRenderer'
import { SlideList } from './slideList/SlideList'
import { presentation } from '../../App'

function WorkSpace() {
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2
	return (
		<div className={styles.workSpace}>
			<div>
				<BookMarks></BookMarks>
				<div className={styles.slideEditorWrapper}>
					<SlideRenderer
						scale={scale}
						isEditor={true}
						keyframe={useContext(presentation).selection.keyFrameId}
					></SlideRenderer>
				</div>
			</div>
			<SlideList scale={scale}></SlideList>
		</div>
	)
}

export { WorkSpace }
