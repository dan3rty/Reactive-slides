import './BookMark.css'
import { ReactNode } from 'react'

type BookMarkProps = {
	text: string
	icon: ReactNode
	curChosen: string
}
function BookMark(props: BookMarkProps) {
	if (props.curChosen == props.text) {
		return (
			<div className="BookMarkChosen">
				{props.icon}
				<span> {props.text} </span>
			</div>
		)
	} else {
		return (
			<div className="BookMark">
				{props.icon}
				<span> {props.text} </span>
			</div>
		)
	}
}

export { BookMark }
