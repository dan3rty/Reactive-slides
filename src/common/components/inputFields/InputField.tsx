import React from 'react'
import './InputField.css'

type sizes = 'small' | 'medium' | 'large'
type inputType = 'number' | 'deg' | 'color' | 'fontFamily'

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
			<div className={`label label_${props.size}`}>{props.label}</div>
			<div className={`value-field`}>
				<input value={props.initialValue} className={'input'} type={props.type}></input>
				<span>{props.suffix}</span>
			</div>
		</div>
	)
}

export { InputField }
