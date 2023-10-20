import React from 'react'
import './BookMarks.css'
import { BookMark } from './BookMark/BookMark'

import { ArrowIcon, SelectIcon, MoveIcon } from '../../../common/icons/icons'
import { Tabs } from '../../../types'

type BookMarksProps = {
	chosenTab: Tabs
}
function BookMarks(props: BookMarksProps) {
	return (
		<div className="BookMarks">
			<BookMark text="create" icon={ArrowIcon} curChosen={props.chosenTab}></BookMark>
			<BookMark text="edit" icon={SelectIcon} curChosen={props.chosenTab}></BookMark>
			<BookMark text="animation" icon={MoveIcon} curChosen={props.chosenTab}></BookMark>
		</div>
	)
}

export { BookMarks }
