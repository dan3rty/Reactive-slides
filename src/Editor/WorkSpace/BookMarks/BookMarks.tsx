import styles from './BookMarks.module.css'
import { BookMark } from './BookMark/BookMark'

import { ArrowIcon, SelectIcon, MoveIcon } from '../../../common/Icons/icons'

function BookMarks() {
	return (
		<div className={styles.BookMarks}>
			<BookMark text='create' icon={ArrowIcon}></BookMark>
			<BookMark text='edit' icon={SelectIcon}></BookMark>
			<BookMark text='animation' icon={MoveIcon}></BookMark>
		</div>
	)
}

export { BookMarks }
