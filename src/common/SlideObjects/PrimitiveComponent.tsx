import { PrimitiveBlock, Primitives } from '../../types'
import { ObjectSelection } from '../../Editor/WorkSpace/ObjectSelection/ObjectSelection'
import React, { useEffect, useRef, useState } from 'react'
import { useDraggableObject } from '../../hooks/useDraggableObject'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	onClick: () => void
	isWorkspace: boolean
	id: string
	slideId: string
	selected: boolean
	ref?: React.MutableRefObject<SVGSVGElement>
}

function Ellipse({
	primitive,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
	selected,
}: PrimitiveProps) {
	const ref = useRef<SVGSVGElement>(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}
	return (
		<>
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
			{selected && <ObjectSelection selectedObject={ref} scale={scale} />}
		</>
	)
}

function Rectangle({ primitive, scale }: PrimitiveProps) {
	const ref = useRef(null)
	const [width, setWidth] = useState(primitive.baseState.width / scale)
	const [height, setHeight] = useState(primitive.baseState.height / scale)
	useEffect(() => {
		setWidth(ref.current.parentNode.style.width)
		setHeight(ref.current.parentNode.style.height)
	}, [ref.current?.parentNode.style.width])
	return (
		<rect
			ref={ref}
			x={0}
			y={0}
			width={width}
			height={height}
			fill={primitive.color.colors[0].hex}
			strokeWidth={primitive.borderSize / scale}
			stroke={primitive.borderColor.hex}
		/>
	)
}

function Triangle({
	primitive,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
	selected,
}: PrimitiveProps) {
	const ref = useRef<SVGSVGElement>(null)
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}
	return (
		<>
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
			{selected && <ObjectSelection selectedObject={ref} scale={scale} />}
		</>
	)
}

function PrimitiveComponent({
	primitive,
	scale,
	onClick,
	slideId,
	id,
	isWorkspace,
	selected,
}: PrimitiveProps) {
	const ref = useRef(null)
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			return (
				<Ellipse
					selected={selected}
					slideId={slideId}
					isWorkspace={isWorkspace}
					id={id}
					primitive={primitive}
					scale={scale}
					onClick={onClick}
				/>
			)
		case Primitives.RECT:
			// return (
			// 	<Rectangle
			// 		selected={selected}
			// 		slideId={slideId}
			// 		isWorkspace={isWorkspace}
			// 		id={id}
			// 		primitive={primitive}
			// 		scale={scale}
			// 		onClick={onClick}
			// 	/>
			// )
			break
		case Primitives.TRIANGLE:
			return (
				<Triangle
					selected={selected}
					slideId={slideId}
					isWorkspace={isWorkspace}
					id={id}
					primitive={primitive}
					scale={scale}
					onClick={onClick}
				/>
			)
	}
	if (isWorkspace) {
		useDraggableObject({
			elementRef: ref,
			elementId: id,
			slideId: slideId,
		})
	}

	useEffect(() => {}, [ref.current?.style.width])
	return (
		<>
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
					border: '1px solid #000000',
				}}
				onClick={onClick}
			>
				<Rectangle
					primitive={primitive}
					scale={scale}
					onClick={onClick}
					isWorkspace={isWorkspace}
					id={id}
					slideId={slideId}
					selected={selected}
				/>
			</svg>
			{selected && <ObjectSelection selectedObject={ref} scale={scale} />}
		</>
	)
}

export { PrimitiveComponent }
