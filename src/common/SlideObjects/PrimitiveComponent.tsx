import { Color, PrimitiveBlock, Primitives } from '../../types'
import { ObjectSelection } from '../../Editor/WorkSpace/ObjectSelection/ObjectSelection'
import React, { useEffect, useRef, useState } from 'react'

type PrimitiveProps = {
	primitive: PrimitiveBlock
	scale: number
	onClick: () => void
	isWorkspace: boolean
	slideId: string
	selected: boolean
	ref?: React.MutableRefObject<SVGSVGElement>
}

function Ellipse({ primitive, scale, onClick, slideId, selected }: PrimitiveProps) {
	const ref = useRef<SVGSVGElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		setIsLoaded(true)
	}, [])
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
			{selected && isLoaded && (
				<ObjectSelection
					id={primitive.id}
					selectedObject={ref}
					scale={scale}
					slideId={slideId}
				/>
			)}
		</>
	)
}

type RectangleProps = {
	hex: string
	borderSize: number
	borderColor: Color
}

function Rectangle({ hex, borderSize, borderColor }: RectangleProps) {
	const ref = useRef(null)
	return (
		<rect
			ref={ref}
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

function Triangle({ primitive, scale, onClick, slideId, selected }: PrimitiveProps) {
	const ref = useRef<SVGSVGElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		setIsLoaded(true)
	}, [])
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
			{selected && isLoaded && (
				<ObjectSelection
					id={primitive.id}
					selectedObject={ref}
					scale={scale}
					slideId={slideId}
				/>
			)}
		</>
	)
}

function PrimitiveComponent({
	primitive,
	scale,
	onClick,
	slideId,
	isWorkspace,
	selected,
}: PrimitiveProps) {
	const ref = useRef(null)
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		setIsLoaded(true)
	}, [])
	switch (primitive.primitiveType) {
		case Primitives.CIRCLE:
			return (
				<Ellipse
					selected={selected}
					slideId={slideId}
					isWorkspace={isWorkspace}
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
					primitive={primitive}
					scale={scale}
					onClick={onClick}
				/>
			)
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
					rotate: `${primitive.baseState.rotation}deg`,
				}}
				onClick={onClick}
			>
				<Rectangle
					hex={primitive.color.colors[0].hex}
					borderSize={primitive.borderSize / scale}
					borderColor={primitive.borderColor}
				/>
			</svg>
			{selected && isLoaded && (
				<ObjectSelection
					id={primitive.id}
					selectedObject={ref}
					scale={scale}
					slideId={slideId}
				/>
			)}
		</>
	)
}

export { PrimitiveComponent }
