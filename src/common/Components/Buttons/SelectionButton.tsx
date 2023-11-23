import React from 'react'
import buttonStyle from './SelectionButton.module.css'
import { ReactNode } from 'react'

type styles = 'light' | 'dark'

type ButtonProps = {
	style: styles
	icon: ReactNode
	onClick?: () => void
}

function SelectionButton(props: ButtonProps) {
	const log = () => {
		console.log("pop");
	}
	return (
		<div onClick={log} className={`${buttonStyle.selectionButton} ${buttonStyle[props.style]}`}>
			{props.icon}
		</div>
	)
}

export { SelectionButton }
