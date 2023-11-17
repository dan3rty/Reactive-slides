import React from 'react'
import buttonStyle from './SelectionButton.module.css'
import { ReactNode } from 'react'

type styles = 'light' | 'dark'

type ButtonProps = {
	style: styles
	icon: ReactNode
}

function SelectionButton(props: ButtonProps) {
	return (
		<div className={`${buttonStyle.selectionButton} ${buttonStyle[props.style]}`}>
			{props.icon}
		</div>
	)
}

export { SelectionButton }
