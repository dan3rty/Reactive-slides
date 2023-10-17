import './BookMark.css'
import { ReactNode } from 'react'

type BookMarkProps = {
	text: string
	icon: ReactNode
}
function BookMark(props: BookMarkProps) {
	return (
		<div className="BookMark">
			{props.icon}
			<span> {props.text} </span>
		</div>
	)
}

export { BookMark }
