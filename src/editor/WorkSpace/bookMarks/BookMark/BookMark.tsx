import React, { FC } from 'react'
import './BookMark.css'

type BookMarkProps = {
	text: string
	icon: FC
}
function BookMark(props: BookMarkProps) {
	return (
		<div className="BookMark">
			<props.icon></props.icon>
			<span> {props.text} </span>
		</div>
	)
}

export { BookMark }
