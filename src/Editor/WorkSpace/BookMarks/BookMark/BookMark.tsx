import styles from './BookMark..css'
import { ReactNode } from 'react'
import { joinCssClasses } from '../../../../classes/joinCssClasses'

type BookMarkProps = {
	text: string
	icon: ReactNode
	isChosen: boolean
	onClick: () => void
	isAvailable: boolean
}
function BookMark({ text, icon, isChosen, onClick, isAvailable }: BookMarkProps) {
	return (
		<div
			className={joinCssClasses(
				styles.bookmark,
				isChosen ? styles.bookmark_chosen : null,
				!isAvailable ? styles.bookmark_unavailable : null,
			)}
			onClick={onClick}
		>
			{icon}
			<span> {text} </span>
		</div>
	)
}

export { BookMark }
