import buttonStyle from './SelectionButton.css'
import { ReactNode } from 'react'
import { joinCssClasses } from '../../../classes/joinCssClasses'

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
			className={joinCssClasses(buttonStyle.selectionButton, buttonStyle[props.style])}
		>
			{props.icon}
		</div>
	)
}

export { SelectionButton }
