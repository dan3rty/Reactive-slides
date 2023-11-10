import React from 'react'
import './BookMarks.css'
import { BookMark } from './BookMark/BookMark'

import { ArrowIcon, SelectIcon, MoveIcon } from '../../../common/icons/icons'

function BookMarks() {
	return (
		<div className='BookMarks'>
			<BookMark text='create' icon={ArrowIcon}></BookMark>
			<BookMark text='edit' icon={SelectIcon}></BookMark>
			<BookMark text='animation' icon={MoveIcon}></BookMark>
		</div>
	)
}

export { BookMarks }
