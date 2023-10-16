import React from 'react'
import './WorkSpace.css'
import { BookMarks } from './bookMarks/BookMarks'
function WorkSpace() {
	return (
		<div className="WorkSpace">
			<BookMarks></BookMarks>
		</div>
	)
}

export { WorkSpace }
