import { PrimitiveBlock, Primitives } from '../../types'
import { useRef } from 'react'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	selected: boolean
	onClick: () => void
	isWorkspace: boolean
	id: string
	slideId: string
}

function Ellipse({
	primitive,
	selected,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
}: PrimitiveProps) {
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
			{selectBorder}
		</svg>
	)
}

function Rectangle({
	primitive,
	selected,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
}: PrimitiveProps) {
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
				width: `${primitive.baseState.width / scale + 12}px`,
				height: `${primitive.baseState.height / scale + 12}px`,
				top: `${primitive.baseState.y / scale}px`,
				left: `${primitive.baseState.x / scale}px`,
				rotate: `${primitive.baseState.rotation}deg`,
			}}
			onClick={onClick}
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

function Triangle({
	primitive,
	selected,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
}: PrimitiveProps) {
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
				strokeLinejoin: 'miter',
				strokeMiterlimit: '8',
				position: 'absolute',
				width: `${primitive.baseState.width / scale + 12}px`,
				height: `${primitive.baseState.height / scale + 12}px`,
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
			{selectBorder}
		</svg>
	)
}

function PrimitiveComponent({
	primitive,
	scale,
	selected,
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
					selected={selected}
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
					selected={selected}
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
					selected={selected}
					onClick={onClick}
				/>
			)
	}
}

export { PrimitiveComponent }
