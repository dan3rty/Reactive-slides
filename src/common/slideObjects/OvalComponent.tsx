import React from 'react'
import './OvalComponent.css'
// import { PrimitiveBlock } from '../../types'
// import { returnGradientString } from '../tools/returnGradientString'
//
// type OvalProps = {
// 	oval: PrimitiveBlock
// }

function OvalComponent() {
	// const ovalStyle: React.CSSProperties = {
	// 	position: 'absolute',
	// 	background: returnGradientString(props.oval.color),
	// 	width: props.oval.baseState.width + 'px',
	// 	height: props.oval.baseState.height + 'px',
	// 	top: props.oval.baseState.y + 'px',
	// 	left: props.oval.baseState.x + 'px',
	// }
	// return <div style={ovalStyle}></div>

	// const style: React.CSSProperties = {
	// 	fill: 'rgb(238, 238, 238)',
	// 	fillOpacity: '1',
	// 	stroke: 'rgb(89, 89, 89)',
	// 	strokeOpacity: '1',
	// 	strokeWidth: '381',
	// 	strokeLinecap: 'butt',
	// 	strokeLinejoin: 'round',
	// 	strokeMiterlimit: '8',
	// }

	return (
		<svg viewBox='0 0 210 297'>
			<path
				// style={style}
				fill='rgb(238, 238, 238)'
				fillOpacity='1'
				stroke='rgb(89, 89, 89)'
				strokeOpacity='1'
				strokeWidth='381'
				strokeLinecap='butt'
				strokeLinejoin='round'
				strokeMiterlimit='8'
				d='M 34548 50465 C 34548 39042.6 44895.6 29783 57660 29783 C 70424.4 29783 80772 39042.6 80772 50465 C 80772 61887.4 70424.4 71147 57660 71147 C 44895.6 71147 34548 61887.4 34548 50465 Z'
			></path>
		</svg>
	)
}

export { OvalComponent }
