import React from 'react'
import { FontFamily } from '../../../types'
import './FontFamilySelection.css'

type FontFamilySelectionProps = {
	value: FontFamily
}

function FontFamilySelection(props: FontFamilySelectionProps) {
	return (
		<div className={'selection-field'}>
			<div className={'selection-field__label'}>
				<span>Font family:</span>
			</div>
			<div className={'selection-field__value-field'}>
				<span>{props.value}</span>
			</div>
		</div>
	)
}

export { FontFamilySelection }
