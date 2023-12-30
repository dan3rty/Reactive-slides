import styles from './Button.css'
import React, { ReactNode, useState } from 'react'
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
	const [selected, setSelected] = useState(false)

	if (size === 'large') {
		return (
			<div
				onClick={(event) => {
					setSelected(true)
					onClick(event)
				}}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
					selected ? styles[`${style}-selected`] : null,
				)}
			>
				<span>{text}</span>
			</div>
		)
	}

	if (size === 'big') {
		return (
			<div
				onClick={(event) => {
					setSelected(true)
					onClick(event)
				}}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
					selected ? styles[`${style}-selected`] : null,
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
				onClick={(event) => {
					setSelected(true)
					onClick(event)
				}}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
					selected ? styles[`${style}-selected`] : null,
				)}
			>
				<span>{text}</span>
			</div>
		)
	}

	if (size === 'small') {
		return (
			<div
				onClick={(event) => {
					setSelected(true)
					onClick(event)
				}}
				className={joinCssClasses(
					styles.button,
					styles.buttonBig,
					styles[style],
					selected ? styles[`${style}-selected`] : null,
				)}
			>
				{icon}
			</div>
		)
	}
	return <div></div>
}

export { Button }
