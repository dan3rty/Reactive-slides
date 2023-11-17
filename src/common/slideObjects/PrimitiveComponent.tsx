import React from 'react'
import { PrimitiveBlock, Primitives } from '../../types'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	selected: boolean
}

function Ellipse(props: PrimitiveProps) {
	const { primitive, scale, selected } = props
	const selectBorder = selected && (
		<ellipse
			strokeDasharray='6'
			fillOpacity={0}
			cx={`${primitive.baseState.width / 2 / scale + 3}px`}
			cy={`${primitive.baseState.height / 2 / scale + 3}px`}
			rx={`${(primitive.baseState.width - primitive.borderSize) / scale / 2 + 6}px`}
			ry={`${(primitive.baseState.height - primitive.borderSize) / scale / 2 + 6}px`}
			strokeWidth={'3px'}
			stroke={'#000000'}
		/>
	)
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale + 6}px`,
				height: `${primitive.baseState.height / scale + 6}px`,
				top: `${primitive.baseState.y / scale}px`,
			}}
		>
			<ellipse
				cx={`${primitive.baseState.width / 2 / scale + 3}px`}
				cy={`${primitive.baseState.height / 2 / scale + 3}px`}
				rx={`${(primitive.baseState.width - primitive.borderSize) / scale / 2}px`}
				ry={`${(primitive.baseState.height - primitive.borderSize) / scale / 2}px`}
				fill={primitive.color.colors[0].hex}
				strokeWidth={primitive.borderSize / scale}
				stroke={primitive.borderColor.hex}
			/>
			{selectBorder}
		</svg>
	)
}

function Rectangle(props: PrimitiveProps) {
	const { primitive, scale, selected } = props
	const selectBorder = selected && (
		<rect
			strokeDasharray='6'
			fillOpacity={0}
			x={3}
			y={3}
			width={`${primitive.baseState.width / scale + 6}px`}
			height={`${primitive.baseState.height / scale + 6}px`}
			strokeWidth={'3px'}
			stroke={'#000000'}
		/>
	)
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale + 12}px`,
				height: `${primitive.baseState.height / scale + 12}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
				rotate: `${primitive.baseState.rotation}deg`,
			}}
		>
			<rect
				x={6}
				y={6}
				width={`${primitive.baseState.width / scale}px`}
				height={`${primitive.baseState.height / scale}px`}
				fill={primitive.color.colors[0].hex}
				strokeWidth={primitive.borderSize / scale}
				stroke={primitive.borderColor.hex}
			/>
			{selectBorder}
		</svg>
	)
}

function Triangle(props: PrimitiveProps) {
	const { primitive, scale, selected } = props
	const selectBorder = selected && (
		<polygon
			strokeDasharray='6'
			points={`${primitive.borderSize / scale} ${
				(primitive.baseState.height - primitive.borderSize) / scale + 3
			}, ${(primitive.baseState.width - primitive.borderSize + 16) / scale} ${
				(primitive.baseState.height - primitive.borderSize) / scale + 3
			}, ${primitive.baseState.width / 2 / scale}
					${primitive.borderSize / scale - 12}`}
			fillOpacity={0}
			strokeWidth={3}
			stroke={'#000000'}
		/>
	)
	return (
		<svg
			key={primitive.id}
			style={{
				strokeLinejoin: 'miter',
				strokeMiterlimit: '8',
				position: 'absolute',
				width: `${primitive.baseState.width / scale + 12}px`,
				height: `${primitive.baseState.height / scale + 12}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
				rotate: `${primitive.baseState.rotation}deg`,
			}}
		>
			<polygon
				points={`${primitive.borderSize / scale + 3} ${
					(primitive.baseState.height - primitive.borderSize) / scale
				}, ${(primitive.baseState.width - primitive.borderSize) / scale + 3} ${
					(primitive.baseState.height - primitive.borderSize) / scale
				}, ${primitive.baseState.width / 2 / scale}
					${primitive.borderSize / scale}`}
				fill={primitive.color.colors[0].hex}
				strokeWidth={primitive.borderSize / scale}
				stroke={primitive.borderColor.hex}
			/>
			{selectBorder}
		</svg>
	)
}

function PrimitiveComponent(props: PrimitiveProps) {
	const { primitive, scale, selected } = props
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			return <Ellipse primitive={primitive} scale={scale} selected={selected} />
		case Primitives.RECT:
			return <Rectangle primitive={primitive} scale={scale} selected={selected} />
		case Primitives.TRIANGLE:
			return <Triangle primitive={primitive} scale={scale} selected={selected} />
	}
}

export { PrimitiveComponent }
