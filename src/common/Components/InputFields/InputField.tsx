import styles from './InputField.css'
import { joinCssClasses } from '../../../classes/joinCssClasses'
import { useRef } from 'react'

type sizes = 'Small' | 'Medium' | 'Large'
type inputType = 'number' | 'text'

type InputProps = {
	label: string
	type: inputType
	initialValue: number
	suffix?: string
	size: sizes
	onChange?: (value: string) => void
}

function InputField({ label, size, type, initialValue, suffix, onChange }: InputProps) {
	const ref = useRef<HTMLInputElement>()
	return (
		<div className={joinCssClasses(styles.inputField, styles['inputField' + size])}>
			<div className={joinCssClasses(styles.inputLabel, styles['inputLabel' + size])}>
				{label}
			</div>
			<div className={joinCssClasses(styles.inputValue, styles['inputValue' + size])}>
				<input
					defaultValue={initialValue}
					className={styles.input}
					type={type}
					ref={ref}
					onChange={() => {
						onChange(ref.current.value)
					}}
				></input>
				<span>{suffix}</span>
			</div>
		</div>
	)
}

export { InputField }
