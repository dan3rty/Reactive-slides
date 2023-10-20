import React from 'react'

type sizes = 'small' | 'medium' | 'large'
type inputType = 'number' | 'deg' | 'color' | 'fontFamily'

type InputProps = {
	label: string
	type: inputType
	suffix?: string
	size: sizes
}

function InputField(props: InputProps) {
	return (
		<div className={props.size}>
			<div className={`label label_${props.size}`}>
				<span className={'label__text'}>{props.label}</span>
			</div>
			<input type={props.type}></input>
			<span>{props.suffix}</span>
		</div>
	)
}

export { InputField }
