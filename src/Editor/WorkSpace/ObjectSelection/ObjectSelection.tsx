import styles from './ObjectSelection.css'
import { useResizableObject } from '../../../hooks/useResizableObject'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PresenterContext } from '../../../App'
import { useDraggableObject } from '../../../hooks/useDraggableObject'

enum CursorType {
	N = 'n-resize',
	NE = 'ne-resize',
	E = 'e-resize',
	SE = 'se-resize',
	S = 's-resize',
	SW = 'sw-resize',
	W = 'w-resize',
	NW = 'nw-resize',
}

enum CursorIntType {
	N = 0,
	NE,
	E,
	SE,
	S,
	SW,
	W,
	NW,
}

function remapCursorIntType(cursorIntType: CursorIntType): CursorType {
	switch (cursorIntType) {
		case CursorIntType.E:
			return CursorType.E
		case CursorIntType.N:
			return CursorType.N
		case CursorIntType.NE:
			return CursorType.NE
		case CursorIntType.NW:
			return CursorType.NW
		case CursorIntType.S:
			return CursorType.S
		case CursorIntType.SE:
			return CursorType.SE
		case CursorIntType.SW:
			return CursorType.SW
		case CursorIntType.W:
			return CursorType.W
	}
}

function getCursorType(defaultCursor: CursorIntType, rotation: number): CursorType {
	if (rotation <= 22.5 || rotation >= 360 - 22.5) {
		return remapCursorIntType(defaultCursor)
	}
	if (rotation >= 45 - 22.5 && rotation <= 90 - 22.5) {
		return remapCursorIntType(defaultCursor + 1 >= 8 ? defaultCursor - 7 : defaultCursor + 1)
	}
	if (rotation >= 90 - 22.5 && rotation <= 135 - 22.5) {
		return remapCursorIntType(defaultCursor + 2 >= 8 ? defaultCursor - 6 : defaultCursor + 2)
	}
	if (rotation >= 135 - 22.5 && rotation <= 180 - 22.5) {
		return remapCursorIntType(defaultCursor + 3 >= 8 ? defaultCursor - 5 : defaultCursor + 3)
	}
	if (rotation >= 180 - 22.5 && rotation <= 225 - 22.5) {
		return remapCursorIntType(defaultCursor + 4 >= 8 ? defaultCursor - 4 : defaultCursor + 4)
	}
	if (rotation >= 225 - 22.5 && rotation <= 270 - 22.5) {
		return remapCursorIntType(defaultCursor + 5 >= 8 ? defaultCursor - 3 : defaultCursor + 5)
	}
	if (rotation >= 270 - 22.5 && rotation <= 315 - 22.5) {
		return remapCursorIntType(defaultCursor + 6 >= 8 ? defaultCursor - 2 : defaultCursor + 6)
	}
	if (rotation >= 315 - 22.5 && rotation <= 360 - 22.5) {
		return remapCursorIntType(defaultCursor + 7 >= 8 ? defaultCursor - 1 : defaultCursor + 7)
	}
}

type CornerProps = {
	x: number
	y: number
	cursor: CursorType
	selectedObject: React.MutableRefObject<SVGSVGElement | HTMLDivElement>
	setWidth: React.Dispatch<React.SetStateAction<number>>
	setHeight: React.Dispatch<React.SetStateAction<number>>
	id: string
}

function Corner({ x, y, cursor, selectedObject, setWidth, setHeight, id }: CornerProps) {
	const { presenter, setPresenter } = useContext(PresenterContext)
	const { registerResizableItem } = useResizableObject()
	const size = 5
	const cornerRef = useRef<HTMLDivElement>(null)
	const objectRef = selectedObject

	useEffect(() => {
		const { onDragStart } = registerResizableItem({ cornerRef, objectRef })

		const onMouseDown = (mouseDownEvent: MouseEvent) => {
			const startWidth = parseFloat(objectRef.current.style.width)
			const startHeight = parseFloat(objectRef.current.style.width)
			onDragStart({
				onDrag: (dragEvent) => {
					const newWidth = startWidth + dragEvent.clientX - mouseDownEvent.clientX
					setWidth(newWidth)

					const newHeight = startHeight + dragEvent.clientY - mouseDownEvent.clientY
					setHeight(newHeight)
				},
				onDrop: (dragEvent) => {
					const newWidth = startWidth + dragEvent.clientX - mouseDownEvent.clientX
					const newHeight = startHeight + dragEvent.clientY - mouseDownEvent.clientY
					const {
						presentation: { slides },
					} = presenter
					const slide = slides.find((slide) => slide.objects.some((obj) => obj.id == id))
					const object = slide.objects.find((obj) => obj.id == id)
					const { baseState } = object
					Object.assign(object, {
						...object,
						baseState: {
							...baseState,
							width: newWidth,
							height: newHeight,
						},
					})
					setPresenter(presenter)
				},
			})
		}

		const control = cornerRef.current!
		control.addEventListener('mousedown', onMouseDown)
		return () => control.removeEventListener('mousedown', onMouseDown)
	}, [registerResizableItem])

	console.log(x)

	return (
		<div
			ref={cornerRef}
			className={styles.corner}
			style={{
				position: 'absolute',
				top: y - size ?? 0,
				left: x - size ?? 0,
				cursor: cursor,
			}}
		></div>
	)
}

type ObjectSelectionProps = {
	selectedObject: React.MutableRefObject<SVGSVGElement>
	id: string
	scale: number
	slideId: string
}

function ObjectSelection({ selectedObject, id, slideId }: ObjectSelectionProps) {
	const ref = useRef(null)
	useDraggableObject({
		elementRef: ref,
		elementId: id,
		slideId: slideId,
	})
	const { clientWidth: width, clientHeight: height } = selectedObject.current
	const { left, top } = selectedObject.current.style
	const x = parseFloat(left)
	const y = parseFloat(top)
	const rotation = selectedObject.current.style.rotate
		? parseFloat(selectedObject.current.style.rotate)
		: 0
	const borderSize = 3
	const [widthState, setWidth] = useState(width)
	const [heightState, setHeight] = useState(height)
	useEffect(() => {
		selectedObject.current.style.width = String(widthState)
		selectedObject.current.style.height = String(heightState)
	}, [widthState, heightState])
	return (
		<div
			ref={ref}
			className={styles.selection}
			style={{
				rotate: rotation + 'deg',
				borderWidth: `${borderSize}px`,
				top: y - borderSize,
				left: x - borderSize,
				width: widthState,
				height: heightState,
			}}
		>
			<Corner
				id={id}
				x={0}
				y={0}
				cursor={getCursorType(CursorIntType.NW, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={widthState / 2}
				y={0}
				cursor={getCursorType(CursorIntType.N, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={widthState}
				y={0}
				cursor={getCursorType(CursorIntType.NE, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={widthState}
				y={heightState / 2}
				cursor={getCursorType(CursorIntType.E, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={widthState}
				y={heightState}
				cursor={getCursorType(CursorIntType.SE, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={widthState / 2}
				y={heightState}
				cursor={getCursorType(CursorIntType.S, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={0}
				y={heightState}
				cursor={getCursorType(CursorIntType.SW, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
			<Corner
				id={id}
				x={0}
				y={heightState / 2}
				cursor={getCursorType(CursorIntType.W, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
			/>
		</div>
	)
}

export { ObjectSelection }
