import React from 'react'
import './WorkSpace.css'
import { BookMarks } from './bookMarks/BookMarks'
import { SlideEditor } from './SlideEditor/SlideEditor'
import { SlideList } from './slideList/SlideList'

function WorkSpace() {
	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2
	return (
		<div className='WorkSpace'>
			<div>
				<BookMarks></BookMarks>
				<div className='slide-editor-wrapper'>
					<SlideEditor scale={scale}></SlideEditor>
				</div>
			</div>
			<SlideList scale={scale}></SlideList>
		</div>
	)
}

export { WorkSpace }
