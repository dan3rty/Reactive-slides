import React from 'react'
import styles from './Button.module.css'
import { ReactNode } from 'react'
//TODO: с БОЛЬШОЙ буквы
type sizes = 'small' | 'medium' | 'big' | 'large'
type buttonStyles = 'light' | 'dark'

type ButtonProps = {
	text?: string
	style: buttonStyles
	size: sizes
	icon?: ReactNode
}

//TODO: ДОБАВИТЬ ONCLICK
function Button(props: ButtonProps) {
	const log = () => {
		console.log("pop");
	}
	if (props.size === 'large') {
		return (
			<div onClick={log} className={`${styles.buttonLarge} ${styles[props.style]}`}>
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'big') {
		return (
			<div onClick={log} className={`${styles.buttonBig} ${styles[props.style]}`}>
				{props.icon}
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'medium') {
		return (
			<div onClick={log} className={`${styles.buttonMedium} ${styles[props.style]}`}>
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'small') {
		return <div onClick={log} className={`${styles.buttonSmall} ${styles[props.style]}`}>{props.icon}</div>
	}
	return <div></div>
}

export { Button }
