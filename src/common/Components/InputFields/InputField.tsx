import styles from './InputField.css'
import { joinCssClasses } from '../../../classes/joinCssClasses'

type sizes = 'Small' | 'Medium' | 'Large'
type inputType = 'number' | 'text'

type InputProps = {
	label: string
	type: inputType
	initialValue: number
	suffix?: string
	size: sizes
}

function InputField({ label, size, type, initialValue, suffix }: InputProps) {
	return (
		<div className={joinCssClasses(styles.inputField, styles['inputField' + size])}>
			<div className={joinCssClasses(styles.inputLabel, styles['inputLabel' + size])}>
				{label}
			</div>
			<div className={joinCssClasses(styles.inputValue, styles['inputValue' + size])}>
				<input defaultValue={initialValue} className={styles.input} type={type}></input>
				<span>{suffix}</span>
			</div>
		</div>
	)
}

export { InputField }
