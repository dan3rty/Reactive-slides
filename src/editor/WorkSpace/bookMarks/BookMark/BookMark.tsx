import './BookMark.css'
import { ReactNode, useContext } from 'react'
import { chosenTab } from '../../../Editor'

type BookMarkProps = {
	text: string
	icon: ReactNode
}
function BookMark(props: BookMarkProps) {
	const curChosen = useContext(chosenTab)
	if (curChosen == props.text) {
		return (
			<div className='BookMarkChosen'>
				{props.icon}
				<span> {props.text} </span>
			</div>
		)
	} else {
		return (
			<div className='BookMark'>
				{props.icon}
				<span> {props.text} </span>
			</div>
		)
	}
}

export { BookMark }
