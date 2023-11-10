import React from 'react'
import './OvalComponent.css'
import { PrimitiveBlock, Primitives } from '../../types'

type OvalProps = {
	primitive: PrimitiveBlock
}

function OvalComponent(props: OvalProps) {
	const { primitive } = props
	console.log(primitive)
	if (primitive.primitiveType === Primitives.CIRCLE) {
		return (
			<svg
				key={primitive.id}
				style={{
					position: 'absolute',
					width: `${primitive.baseState.width}px`,
					height: `${primitive.baseState.height}px`,
					top: `${primitive.baseState.y}px`,
					left: `${primitive.baseState.x}px`,
					rotate: `${primitive.baseState.rotation}deg`,
				}}
			>
				<ellipse
					cx={`${primitive.baseState.width / 2}px`}
					cy={`${primitive.baseState.height / 2}px`}
					rx={`50%`}
					ry={`50%`}
					fill={primitive.color.colors[0].hex}
				/>
			</svg>
		)
	}
	if (primitive.primitiveType === Primitives.RECT) {
		return (
			<svg
				key={primitive.id}
				style={{
					position: 'absolute',
					width: `${primitive.baseState.width}px`,
					height: `${primitive.baseState.height}px`,
					top: `${primitive.baseState.y}px`,
					left: `${primitive.baseState.x}px`,
					rotate: `${primitive.baseState.rotation}deg`,
				}}
			>
				<rect
					x={0}
					y={0}
					width={`100%`}
					height={`100%`}
					fill={primitive.color.colors[0].hex}
				/>
			</svg>
		)
	}
	if (primitive.primitiveType === Primitives.TRIANGLE) {
		return (
			<svg
				key={primitive.id}
				style={{
					position: 'absolute',
					width: `${primitive.baseState.width}px`,
					height: `${primitive.baseState.height}px`,
					top: `${primitive.baseState.y}px`,
					left: `${primitive.baseState.x}px`,
					rotate: `${primitive.baseState.rotation}deg`,
				}}
			>
				<polygon
					points={`0 ${primitive.baseState.height}, ${primitive.baseState.width} ${
						primitive.baseState.height
					}, ${primitive.baseState.width / 2}
					0`}
				/>
				{/*<rect*/}
				{/*	x={0}*/}
				{/*	y={0}*/}
				{/*	width={`100%`}*/}
				{/*	height={`100%`}*/}
				{/*	fill={primitive.color.colors[0].hex}*/}
				{/*/>*/}
			</svg>
		)
	}
}

export { OvalComponent }
