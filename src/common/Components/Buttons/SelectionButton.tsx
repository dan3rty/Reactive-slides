import buttonStyle from './SelectionButton.css'
import React, { ReactNode } from 'react'
import { joinCssClasses } from '../../../classes/joinCssClasses'

type styles = 'light' | 'dark'

type ButtonProps = {
	style: styles
	icon: ReactNode
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

function SelectionButton({ style, icon, onClick }: ButtonProps) {
	const click = () => {}
	return (
		<div
			onClick={onClick ?? click}
			className={joinCssClasses(buttonStyle.selectionButton, buttonStyle[style])}
		>
			{icon}
		</div>
	)
}

export { SelectionButton }
