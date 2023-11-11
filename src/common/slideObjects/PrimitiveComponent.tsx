import React from 'react'
import { PrimitiveBlock, Primitives } from '../../types'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
}

function Ellipse(props: PrimitiveProps) {
	const { primitive, scale } = props
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale}px`,
				height: `${primitive.baseState.height / scale}px`,
				top: `${primitive.baseState.y / scale}px`,
			}}
		>
			<ellipse
				cx={`${primitive.baseState.width / 2 / scale}px`}
				cy={`${primitive.baseState.height / 2 / scale}px`}
				rx={`50%`}
				ry={`50%`}
				fill={primitive.color.colors[0].hex}
			/>
		</svg>
	)
}

function Rectangle(props: PrimitiveProps) {
	const { primitive, scale } = props
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale}px`,
				height: `${primitive.baseState.height / scale}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
				rotate: `${primitive.baseState.rotation}deg`,
			}}
		>
			<rect x={0} y={0} width={`100%`} height={`100%`} fill={primitive.color.colors[0].hex} />
		</svg>
	)
}

function Triangle(props: PrimitiveProps) {
	const { primitive, scale } = props
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale}px`,
				height: `${primitive.baseState.height / scale}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
				rotate: `${primitive.baseState.rotation}deg`,
			}}
		>
			<polygon
				points={`0 ${primitive.baseState.height / scale}, ${
					primitive.baseState.width / scale
				} ${primitive.baseState.height / scale}, ${primitive.baseState.width / 2 / scale}
					0`}
				fill={primitive.color.colors[0].hex}
			/>
		</svg>
	)
}

function PrimitiveComponent(props: PrimitiveProps) {
	const { primitive, scale } = props
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			return <Ellipse primitive={primitive} scale={scale} />
		case Primitives.RECT:
			return <Rectangle primitive={primitive} scale={scale} />
		case Primitives.TRIANGLE:
			return <Triangle primitive={primitive} scale={scale} />
	}
}

export { PrimitiveComponent }
