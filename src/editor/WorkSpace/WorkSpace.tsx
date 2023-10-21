import React from 'react'
import './WorkSpace.css'
import { BookMarks } from './bookMarks/BookMarks'
import { Tabs } from '../../types'

type WorkSpaceProps = {
	chosenTab: Tabs
}
function WorkSpace(props: WorkSpaceProps) {
	return (
		<div className="WorkSpace">
			<BookMarks chosenTab={props.chosenTab}></BookMarks>
		</div>
	)
}

export { WorkSpace }
