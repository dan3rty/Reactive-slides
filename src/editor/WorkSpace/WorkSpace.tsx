import React from 'react'
import './WorkSpace.css'
import { BookMarks } from './bookMarks/BookMarks'
import { Tabs } from '../../types'
function WorkSpace() {
	return (
		<div className="WorkSpace">
			<BookMarks chosenTab={Tabs.EDIT}></BookMarks>
		</div>
	)
}

export { WorkSpace }
