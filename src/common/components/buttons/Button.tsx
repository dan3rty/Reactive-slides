import React, { FC } from 'react'
import './Button.css'

type sizes = 'small' | 'medium'
type styles = 'light' | 'dark'

type ButtonProps = {
	text?: string
	style: styles
	size: sizes
	icon: FC
}
function Button(props: ButtonProps) {
	if (props.size === 'medium' && props.text) {
		return (
			<div className={'medium' + props.style}>
				<props.icon></props.icon>
				<span>{props.text}</span>
			</div>
		)
	}
	if (props.size === 'small') {
		return (
			<div className={'small' + props.style}>
				<props.icon></props.icon>
			</div>
		)
	}
}

export { Button }
