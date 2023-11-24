import React from 'react'
import styles from './InputField.module.css'

type sizes = 'Small' | 'Medium' | 'Large'
type inputType = 'number' | 'text'

type InputProps = {
	label: string
	type: inputType
	initialValue: number
	suffix?: string
	size: sizes
}

function InputField(props: InputProps) {
	const { size } = props
	return (
		<div className={`${styles.inputField} ${styles['inputField' + size]}`}>
			<div className={`${styles.inputLabel} ${styles['inputLabel' + size]}`}>
				{props.label}
			</div>
			<div className={`${styles.inputValue} ${styles['inputValue' + size]}`}>
				<input
					value={props.initialValue}
					className={styles.input}
					type={props.type}
				></input>
				<span>{props.suffix}</span>
			</div>
		</div>
	)
}

export { InputField }
