import React from 'react'
import { PrimitiveBlock, Primitives } from '../../types'

type OvalProps = {
	primitive: PrimitiveBlock
	scale: number
}

function PrimitiveComponent(props: OvalProps) {
	const { primitive } = props
	console.log(primitive)
	if (primitive.primitiveType === Primitives.CIRCLE) {
		return (
			<svg
				key={primitive.id}
				style={{
					position: 'absolute',
					width: `${primitive.baseState.width / props.scale}px`,
					height: `${primitive.baseState.height / props.scale}px`,
					top: `${primitive.baseState.y / props.scale}px`,
					left: `${primitive.baseState.x / props.scale}px`,
					rotate: `${primitive.baseState.rotation}deg`,
				}}
			>
				<ellipse
					cx={`${primitive.baseState.width / 2 / props.scale}px`}
					cy={`${primitive.baseState.height / 2 / props.scale}px`}
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
					width: `${primitive.baseState.width / props.scale}px`,
					height: `${primitive.baseState.height / props.scale}px`,
					top: `${primitive.baseState.y / props.scale}px`,
					left: `${primitive.baseState.x / props.scale}px`,
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
					width: `${primitive.baseState.width / props.scale}px`,
					height: `${primitive.baseState.height / props.scale}px`,
					top: `${primitive.baseState.y / props.scale}px`,
					left: `${primitive.baseState.x / props.scale}px`,
					rotate: `${primitive.baseState.rotation}deg`,
				}}
			>
				<polygon
					points={`0 ${primitive.baseState.height / props.scale}, ${
						primitive.baseState.width / props.scale
					} ${primitive.baseState.height / props.scale}, ${
						primitive.baseState.width / 2 / props.scale
					}
					0`}
					fill={primitive.color.colors[0].hex}
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

export { PrimitiveComponent }
