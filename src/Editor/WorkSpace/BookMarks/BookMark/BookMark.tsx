import styles from './BookMark.module.css'
import { ReactNode, useContext } from 'react'
import { PresenterContext } from '../../../../App'

type BookMarkProps = {
	text: string
	icon: ReactNode
}
function BookMark(props: BookMarkProps) {
	const curChosen = useContext(PresenterContext).presenter.selection.selectedTab
	if (curChosen == props.text) {
		return (
			<div className={styles.BookMarkChosen}>
				{props.icon}
				<span> {props.text} </span>
			</div>
		)
	} else {
		return (
			<div className={styles.BookMark}>
				{props.icon}
				<span> {props.text} </span>
			</div>
		)
	}
}

export { BookMark }