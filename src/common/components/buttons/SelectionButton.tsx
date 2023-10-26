import React from 'react'
import './SelectionButton.css'
import { ReactNode } from 'react'

type styles = 'light' | 'dark'

type ButtonProps = {
	style: styles
	icon: ReactNode
}

function SelectionButton(props: ButtonProps) {
	return <div className={`selection-button selection-button_${props.style}`}>{props.icon}</div>
}

export { SelectionButton }
