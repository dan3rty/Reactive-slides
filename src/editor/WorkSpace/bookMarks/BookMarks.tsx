import React from 'react'
import './BookMarks.css'
import { BookMark } from './BookMark/BookMark'
import { Arrow } from '../../../common/icons/Arrow'
import { DashedSquare } from '../../../common/icons/DashedSquare'
import { MoveIcon } from '../../../common/icons/MoveIcon'
function BookMarks() {
	return (
		<div className="BookMarks">
			<BookMark text="create" icon={Arrow}></BookMark>
			<BookMark text="edit" icon={DashedSquare}></BookMark>
			<BookMark text="animation" icon={MoveIcon}></BookMark>
		</div>
	)
}

export { BookMarks }
