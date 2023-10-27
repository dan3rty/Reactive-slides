import React from 'react'
import './OvalComponent.css'
import { GradientColor, PrimitiveBlock } from '../../types'

type OvalProps = {
	oval: PrimitiveBlock
}

function returnGradientString(colors: GradientColor) {
	let string = colors.colors[0].hex
	for (let i = 1; i < colors.colors.length; i++) {
		string = string + ', ' + colors.colors[i].hex
	}
	return 'linear-gradient(' + string + ')'
}

function OvalComponent(props: OvalProps) {
	const ovalStyle = {
		position: 'absolure',
		background: returnGradientString(props.oval.color),
		width: props.oval.baseState.width + 'px',
		height: props.oval.baseState.height + 'px',
		top: props.oval.baseState.y + 'px',
		bottom: props.oval.baseState.x + 'px',
	}
	return <div style={ovalStyle}></div>
}

export { OvalComponent }
