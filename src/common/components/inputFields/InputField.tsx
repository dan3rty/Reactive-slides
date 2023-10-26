import React from 'react'
import './InputField.css'

type sizes = 'small' | 'medium' | 'large'
type inputType = 'number' | 'text'

type InputProps = {
	label: string
	type: inputType
	initialValue: number
	suffix?: string
	size: sizes
}

function InputField(props: InputProps) {
	return (
		<div className={`input-field input-field_${props.size}`}>
			<div className={`input-field__label input-field__label_${props.size}`}>
				{props.label}
			</div>
			<div className={`input-field__value-field input-field__value-field_${props.size}`}>
				<input value={props.initialValue} className={'input'} type={props.type}></input>
				<span>{props.suffix}</span>
			</div>
		</div>
	)
}

export { InputField }
