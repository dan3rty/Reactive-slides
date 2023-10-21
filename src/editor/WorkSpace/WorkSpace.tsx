import React from 'react'
import './WorkSpace.css'
import { BookMarks } from './bookMarks/BookMarks'
import { SlideEditor } from './SlideEditor/SlideEditor'

function WorkSpace() {
	return (
		<div className="WorkSpace">
			<BookMarks></BookMarks>
			<SlideEditor></SlideEditor>
		</div>
	)
}

export { WorkSpace }
