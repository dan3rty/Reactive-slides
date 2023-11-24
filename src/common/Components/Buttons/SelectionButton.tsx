import buttonStyle from './SelectionButton.css'
import { ReactNode } from 'react'

type styles = 'light' | 'dark'

type ButtonProps = {
	style: styles
	icon: ReactNode
	onClick?: () => void
}

function SelectionButton(props: ButtonProps) {
	const click = () => {
		console.log('click')
	}
	return (
		<div
			onClick={props.onClick ?? click}
			className={`${buttonStyle.selectionButton} ${buttonStyle[props.style]}`}
		>
			{props.icon}
		</div>
	)
}

export { SelectionButton }
