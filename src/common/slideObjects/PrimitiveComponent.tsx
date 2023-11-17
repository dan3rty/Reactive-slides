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
				rx={`${(primitive.baseState.width - primitive.borderSize) / scale / 2}px`}
				ry={`${(primitive.baseState.height - primitive.borderSize) / scale / 2}px`}
				fill={primitive.color.colors[0].hex}
				strokeWidth={primitive.borderSize / scale}
				stroke={primitive.borderColor.hex}
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
			<rect
				x={0}
				y={0}
				width={`${primitive.baseState.width / scale}px`}
				height={`${primitive.baseState.height / scale}px`}
				fill={primitive.color.colors[0].hex}
				strokeWidth={primitive.borderSize / scale}
				stroke={primitive.borderColor.hex}
			/>
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
				points={`${primitive.borderSize / scale} ${
					(primitive.baseState.height - primitive.borderSize) / scale
				}, ${(primitive.baseState.width - primitive.borderSize) / scale} ${
					(primitive.baseState.height - primitive.borderSize) / scale
				}, ${primitive.baseState.width / 2 / scale}
					${primitive.borderSize / scale}`}
				fill={primitive.color.colors[0].hex}
				strokeWidth={primitive.borderSize / scale}
				stroke={primitive.borderColor.hex}
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
