import { PrimitiveBlock, Primitives } from '../../types'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	onClick: () => void
}

function Ellipse({ primitive, scale, onClick }: PrimitiveProps) {
	return (
		<svg
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale + 6}px`,
				height: `${primitive.baseState.height / scale + 6}px`,
				top: `${primitive.baseState.y / scale}px`,
			}}
			onClick={onClick}
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
		</svg>
	)
}

function Rectangle({ primitive, scale, onClick }: PrimitiveProps) {
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
			onClick={onClick}
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

function Triangle({ primitive, scale, onClick }: PrimitiveProps) {
	console.log('xP ', primitive.baseState.x / scale)
	console.log('yP ', primitive.baseState.y / scale)
	return (
		<svg
			key={primitive.id}
			style={{
				strokeLinejoin: 'miter',
				strokeMiterlimit: '8',
				position: 'absolute',
				width: `${primitive.baseState.width / scale}px`,
				height: `${primitive.baseState.height / scale}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
				rotate: `${primitive.baseState.rotation}deg`,
			}}
			onClick={onClick}
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
		</svg>
	)
}

function PrimitiveComponent({ primitive, scale, onClick }: PrimitiveProps) {
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			return <Ellipse primitive={primitive} scale={scale} onClick={onClick} />
		case Primitives.RECT:
			return <Rectangle primitive={primitive} scale={scale} onClick={onClick} />
		case Primitives.TRIANGLE:
			return <Triangle primitive={primitive} scale={scale} onClick={onClick} />
	}
}

export { PrimitiveComponent }
