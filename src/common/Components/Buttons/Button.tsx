import styles from './Button.module.css'
import { ReactNode } from 'react'

type Sizes = 'small' | 'medium' | 'big' | 'large'
type ButtonStyles = 'light' | 'dark'

type ButtonProps = {
	text?: string
	style: ButtonStyles
	size: Sizes
	icon?: ReactNode
	onClick?: () => void
}

function Button(props: ButtonProps) {
	const click = () => {
		console.log('click')
	}
	if (props.size === 'large') {
		return (
			<div
				onClick={props.onClick ?? click}
				className={`${styles.button} ${styles.buttonLarge} ${styles[props.style]}`}
			>
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'big') {
		return (
			<div
				onClick={props.onClick}
				className={`${styles.button} ${styles.buttonBig} ${styles[props.style]}`}
			>
				{props.icon}
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'medium') {
		return (
			<div
				onClick={props.onClick}
				className={`${styles.button} ${styles.buttonMedium} ${styles[props.style]}`}
			>
				<span>{props.text}</span>
			</div>
		)
	}

	if (props.size === 'small') {
		return (
			<div
				onClick={props.onClick}
				className={`${styles.button} ${styles.buttonSmall} ${styles[props.style]}`}
			>
				{props.icon}
			</div>
		)
	}
	return <div></div>
}

export { Button }
