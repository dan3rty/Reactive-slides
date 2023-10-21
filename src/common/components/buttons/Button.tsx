import React from 'react'
import './Button.css'
import { ReactNode } from 'react'

type sizes = 'small' | 'medium'
type styles = 'light' | 'dark'

type ButtonProps = {
	text?: string
	style: styles
	size: sizes
	icon: ReactNode
}

function Button(props: ButtonProps) {
	if (props.size === 'medium' && props.text) {
		return (
			<div className={`button button_medium ${props.style}`}>
				{props.icon}
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'small') {
		return <div className={`button button_small ${props.style}`}>{props.icon}</div>
	}
	return <div className={'button button_medium'}></div>
}

export { Button }
