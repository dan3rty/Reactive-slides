import styles from './Button.css'
import React, { ReactNode } from 'react'
import { joinCssClasses } from '../../../classes/joinCssClasses'

type Sizes = 'small' | 'medium' | 'big' | 'large'
type ButtonStyles = 'light' | 'dark'

type ButtonProps = {
	text?: string
	style: ButtonStyles
	size: Sizes
	icon?: ReactNode
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

function Button({ text, style, size, icon, onClick }: ButtonProps) {

	if (size === 'large') {
		return (
			<div
				onClick={onClick}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
				)}
			>
				<span>{text}</span>
			</div>
		)
	}

	if (size === 'big') {
		return (
			<div
				onClick={onClick}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
				)}
			>
				{icon}
				<span>{text}</span>
			</div>
		)
	}

	if (size === 'medium') {
		return (
			<div
				onClick={onClick}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
				)}
			>
				<span>{text}</span>
			</div>
		)
	}

	if (size === 'small') {
		return (
			<div
				onClick={onClick}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
				)}
			>
				{icon}
			</div>
		)
	}
	return <div></div>
}

export { Button }
