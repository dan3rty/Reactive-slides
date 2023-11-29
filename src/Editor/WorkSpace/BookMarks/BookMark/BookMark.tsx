import styles from './BookMark.module.css'
import { ReactNode } from 'react'
import { joinCssClasses } from '../../../../classes/joinCssClasses'

type BookMarkProps = {
	text: string
	icon: ReactNode
	isChosen: boolean
	onClick: () => void
}
function BookMark({ text, icon, isChosen, onClick }: BookMarkProps) {
	return (
		<div
			className={joinCssClasses(styles.BookMark, isChosen ? styles.BookMarkChosen : false)}
			onClick={onClick}
		>
			{icon}
			<span> {text} </span>
		</div>
	)
}

export { BookMark }
