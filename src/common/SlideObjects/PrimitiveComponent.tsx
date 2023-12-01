import { PrimitiveBlock, Primitives } from '../../types'
import { useRef } from 'react'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	onClick: () => void
	isWorkspace: boolean
	id: string
	slideId: string
}

function Ellipse({ primitive, scale, onClick, slideId, id, isWorkspace }: PrimitiveProps) {
	const ref = useRef(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}
	return (
		<svg
			ref={ref}
			key={primitive.id}
			style={{
				position: 'absolute',
				width: `${primitive.baseState.width / scale}px`,
				height: `${primitive.baseState.height / scale}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
			}}
			onClick={onClick}
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

function Rectangle({ primitive, scale, onClick, slideId, id, isWorkspace }: PrimitiveProps) {
	const ref = useRef(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}
	return (
		<svg
			ref={ref}
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

function Triangle({ primitive, scale, onClick, slideId, id, isWorkspace }: PrimitiveProps) {
	const ref = useRef(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}
	return (
		<svg
			ref={ref}
			key={primitive.id}
			style={{
				transformOrigin: 'center',
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

function PrimitiveComponent({
	primitive,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
}: PrimitiveProps) {
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			return (
				<Ellipse
					slideId={slideId}
					isWorkspace={isWorkspace}
					id={id}
					primitive={primitive}
					scale={scale}
					onClick={onClick}
				/>
			)
		case Primitives.RECT:
			return (
				<Rectangle
					slideId={slideId}
					isWorkspace={isWorkspace}
					id={id}
					primitive={primitive}
					scale={scale}
					onClick={onClick}
				/>
			)
		case Primitives.TRIANGLE:
			return (
				<Triangle
					slideId={slideId}
					isWorkspace={isWorkspace}
					id={id}
					primitive={primitive}
					scale={scale}
					onClick={onClick}
				/>
			)
	}
}

export { PrimitiveComponent }
