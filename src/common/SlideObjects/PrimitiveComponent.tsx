import { Color, PrimitiveBlock, Primitives } from '../../types'
import React from 'react'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	onClick: () => void
	ref?: React.MutableRefObject<SVGSVGElement>
}

type PrimitiveElementProps = {
	hex: string
	borderSize: number
	borderColor: Color
}

function Ellipse({ hex, borderSize, borderColor }: PrimitiveElementProps) {
	return (
		<ellipse
			cx='50%'
			cy='50%'
			rx={`calc(50% - ${borderSize / 2}px)`}
			ry={`calc(50% - ${borderSize / 2}px)`}
			fill={hex}
			strokeWidth={borderSize}
			stroke={borderColor.hex}
		/>
	)
}

function Rectangle({ hex, borderSize, borderColor }: PrimitiveElementProps) {
	return (
		<rect
			x={0}
			y={0}
			width={'100%'}
			height={'100%'}
			fill={hex}
			strokeWidth={borderSize}
			stroke={borderColor.hex}
		/>
	)
}

function Triangle({ hex, borderSize, borderColor }: PrimitiveElementProps) {
	return (
		<polygon
			points={`${borderSize} 100, ${100 - borderSize} 100, 50 ${borderSize}`}
			fill={hex}
			strokeWidth={borderSize}
			stroke={borderColor.hex}
		/>
	)
}

const PrimitiveComponent = React.forwardRef(function (
	{ primitive, scale, onClick }: PrimitiveProps,
	ref: React.ForwardedRef<SVGSVGElement>,
) {
	let primitiveEl
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			primitiveEl = (
				<Ellipse
					hex={primitive.color.colors[0].hex}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
				/>
			)
			break
		case Primitives.RECT:
			primitiveEl = (
				<Rectangle
					hex={primitive.color.colors[0].hex}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
				/>
			)
			break
		case Primitives.TRIANGLE:
			primitiveEl = (
				<Triangle
					hex={primitive.color.colors[0].hex}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
				/>
			)
			break
	}
	return (
		<>
			<svg
				ref={ref}
				key={primitive.id}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
				}}
				viewBox={primitive.primitiveType == Primitives.TRIANGLE ? '0 0 100 100' : ''}
				preserveAspectRatio='none'
				onClick={onClick}
			>
				{primitiveEl}
			</svg>
		</>
	)
})

export { PrimitiveComponent }
