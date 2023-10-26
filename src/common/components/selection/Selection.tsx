import React, { ReactNode } from 'react'
import './Selection.css'
import { SelectionButton } from '../buttons/SelectionButton'

type SelectionProps = {
	firstIcon: ReactNode
	secondIcon: ReactNode
	thirdIcon: ReactNode
}

function Selection(props: SelectionProps) {
	return (
		<div className={'selection'}>
			<SelectionButton style={'light'} icon={props.firstIcon} />
			<div className={'selection__border'}></div>
			<SelectionButton style={'light'} icon={props.secondIcon} />
			<div className={'selection__border'}></div>
			<SelectionButton style={'light'} icon={props.thirdIcon} />
		</div>
	)
}

export { Selection }
