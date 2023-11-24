import React from 'react'
import styles from './Button.module.css'
import { ReactNode } from 'react'

type Sizes = 'small' | 'medium' | 'big' | 'large'
type ButtonStyles = 'light' | 'dark'

type ButtonProps = {
	text?: string
	style: ButtonStyles
	size: Sizes
	icon?: ReactNode
}

//TODO: ДОБАВИТЬ ONCLICK
function Button(props: ButtonProps) {
	if (props.size === 'large') {
		return (
			<div className={`${styles.buttonLarge} ${styles[props.style]}`}>
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'big') {
		return (
			<div className={`${styles.buttonBig} ${styles[props.style]}`}>
				{props.icon}
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'medium') {
		return (
			<div className={`${styles.buttonMedium} ${styles[props.style]}`}>
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'small') {
		return <div className={`${styles.buttonSmall} ${styles[props.style]}`}>{props.icon}</div>
	}
	return <div></div>
}

export { Button }
