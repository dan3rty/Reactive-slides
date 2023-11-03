import React from 'react'
import './WorkSpace.css'
import { BookMarks } from './bookMarks/BookMarks'
import { SlideEditor } from './SlideEditor/SlideEditor'
import { SlideList } from './slideList/SlideList'

function WorkSpace() {
	return (
		<div className='WorkSpace'>
			<div>
				<BookMarks></BookMarks>
				<div className='slide-editor-wrapper'>
					<SlideEditor scale={2.5}></SlideEditor>
				</div>
			</div>
			<SlideList></SlideList>
		</div>
	)
}

export { WorkSpace }
