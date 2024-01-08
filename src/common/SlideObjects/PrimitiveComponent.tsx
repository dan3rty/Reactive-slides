import { Color, PrimitiveBlock, Primitives } from '../../model/types'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	onClick: () => void
}

type PrimitiveElementProps = {
	hex: string
	borderSize: number
	borderColor: Color
	onClick: () => void
}

function Ellipse({ hex, borderSize, borderColor, onClick }: PrimitiveElementProps) {
	return (
		<ellipse
			pointerEvents={'visibleFill'}
			cx='50%'
			cy='50%'
			rx={`calc(50% - ${borderSize / 2}px)`}
			ry={`calc(50% - ${borderSize / 2}px)`}
			fill={hex}
			strokeWidth={borderSize}
			stroke={borderColor.hsl}
			onClick={onClick}
		/>
	)
}

function Rectangle({ hex, borderSize, borderColor, onClick }: PrimitiveElementProps) {
	return (
		<rect
			pointerEvents={'visibleFill'}
			x={0}
			y={0}
			width={'100%'}
			height={'100%'}
			fill={hex}
			strokeWidth={borderSize}
			stroke={borderColor.hsl}
			onClick={onClick}
		/>
	)
}

function Triangle({ hex, borderSize, borderColor, onClick }: PrimitiveElementProps) {
	return (
		<polygon
			pointerEvents={'visibleFill'}
			points={`${borderSize} 100, ${100 - borderSize} 100, 50 ${borderSize}`}
			fill={hex}
			strokeWidth={borderSize}
			stroke={borderColor.hsl}
			onClick={onClick}
		/>
	)
}

const PrimitiveComponent = function ({ primitive, scale, onClick }: PrimitiveProps) {
	let primitiveEl
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			primitiveEl = (
				<Ellipse
					hex={primitive.color.colors[0].hsl}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
					onClick={onClick}
				/>
			)
			break
		case Primitives.RECT:
			primitiveEl = (
				<Rectangle
					hex={primitive.color.colors[0].hsl}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
					onClick={onClick}
				/>
			)
			break
		case Primitives.TRIANGLE:
			primitiveEl = (
				<Triangle
					hex={primitive.color.colors[0].hsl}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
					onClick={onClick}
				/>
			)
			break
	}
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: '0px',
				left: '0px',
				pointerEvents: 'none',
			}}
			viewBox={primitive.primitiveType == Primitives.TRIANGLE ? '0 0 100 100' : null}
			preserveAspectRatio='none'
		>
			{primitiveEl}
		</svg>
	)
}

export { PrimitiveComponent }
