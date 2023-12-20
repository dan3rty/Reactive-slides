import styles from './ObjectSelection.css'
import { useResizableObject } from '../../../hooks/useResizableObject'
import React, { useEffect, useRef, useState } from 'react'
import { useDraggableObject } from '../../../hooks/useDraggableObject'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

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
	setTop: React.Dispatch<React.SetStateAction<number>>
	setLeft: React.Dispatch<React.SetStateAction<number>>
	scale: number
	id: string
	canChangeWidth: boolean
	canChangeHeight: boolean
	canChangeTop: boolean
	canChangeLeft: boolean
}

function Corner({
	x,
	y,
	cursor,
	selectedObject,
	setWidth,
	setHeight,
	setTop,
	setLeft,
	id,
	canChangeWidth,
	canChangeLeft,
	canChangeHeight,
	canChangeTop,
}: CornerProps) {
	const { createChangeObjectAction } = useAppActions()
	const slides = useAppSelector((state) => state.slides)
	const { registerResizableItem } = useResizableObject()
	const size = 5
	const cornerRef = useRef<HTMLDivElement>(null)
	const objectRef = selectedObject

	useEffect(() => {
		const { onDragStart } = registerResizableItem()

		const onMouseDown = (mouseDownEvent: MouseEvent) => {
			const startWidth = parseFloat(objectRef.current.style.width)
			const startHeight = parseFloat(objectRef.current.style.height)
			const startTop = parseFloat(objectRef.current.style.top)
			const startLeft = parseFloat(objectRef.current.style.left)
			onDragStart({
				onDrag: (dragEvent) => {
					if (canChangeWidth && !canChangeLeft) {
						const newWidth = startWidth + dragEvent.clientX - mouseDownEvent.clientX
						setWidth(newWidth)
					}

					if (canChangeHeight && !canChangeTop) {
						const newHeight = startHeight + dragEvent.clientY - mouseDownEvent.clientY
						setHeight(newHeight)
					}

					if (canChangeTop) {
						const newTop = startTop + dragEvent.clientY - mouseDownEvent.clientY
						const newHeight = startHeight - (dragEvent.clientY - mouseDownEvent.clientY)
						setTop(newTop)
						setHeight(newHeight)
					}

					if (canChangeLeft) {
						const newLeft = startLeft + dragEvent.clientX - mouseDownEvent.clientX
						const newWidth = startWidth - (dragEvent.clientX - mouseDownEvent.clientX)
						setLeft(newLeft)
						setWidth(newWidth)
					}
				},
				onDrop: () => {
					const slide = slides.find((slide) => slide.objects.some((obj) => obj.id == id))
					const object = slide.objects.find((object) => object.id == id)
					createChangeObjectAction(id, object) //TODO сделать изменненны объект
				},
			})
		}

		const control = cornerRef.current!
		control.addEventListener('mousedown', onMouseDown)
		return () => control.removeEventListener('mousedown', onMouseDown)
	}, [registerResizableItem])

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
	selectedObject: React.MutableRefObject<SVGSVGElement | HTMLDivElement>
	id: string
	scale: number
	slideId: string
}

function ObjectSelection({ selectedObject, id, slideId, scale }: ObjectSelectionProps) {
	if (!selectedObject.current) {
		return null
	}
	const ref = useRef(null)
	useDraggableObject({
		elementRef: ref,
		elementId: id,
		slideId: slideId,
	})
	const { clientWidth: width, clientHeight: height } = selectedObject.current
	const rotation = selectedObject.current.style.rotate
		? parseFloat(selectedObject.current.style.rotate)
		: 0
	const borderSize = 3
	const [widthState, setWidth] = useState(width)
	const [heightState, setHeight] = useState(height)
	const [topState, setTop] = useState(parseFloat(selectedObject.current.style.top))
	const [leftState, setLeft] = useState(parseFloat(selectedObject.current.style.left))
	useEffect(() => {
		selectedObject.current.style.width = String(widthState) + 'px'
		selectedObject.current.style.height = String(heightState) + 'px'
		selectedObject.current.style.top = String(topState) + 'px'
		selectedObject.current.style.left = String(leftState) + 'px'
	}, [widthState, heightState, topState, leftState]) //TODO Убрать
	useEffect(() => {
		setTop(parseFloat(selectedObject.current.style.top))
		setLeft(parseFloat(selectedObject.current.style.left))
	}, [selectedObject.current.style.top, selectedObject.current.style.left])
	return (
		<div
			className={styles.selection}
			style={{
				borderWidth: `${borderSize}px`,
				top: -borderSize,
				left: -borderSize,
				width: '100%',
				height: '100%',
			}}
		>
			<div ref={ref} className={styles.draggableSpace}></div>
			<Corner
				id={id}
				x={0}
				y={0}
				cursor={getCursorType(CursorIntType.NW, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={true}
				canChangeTop={true}
			/>
			<Corner
				id={id}
				x={widthState / 2}
				y={0}
				cursor={getCursorType(CursorIntType.N, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={false}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={true}
			/>
			<Corner
				id={id}
				x={widthState}
				y={0}
				cursor={getCursorType(CursorIntType.NE, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={true}
			/>
			<Corner
				id={id}
				x={widthState}
				y={heightState / 2}
				cursor={getCursorType(CursorIntType.E, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={false}
				canChangeLeft={false}
				canChangeTop={false}
			/>
			<Corner
				id={id}
				x={widthState}
				y={heightState}
				cursor={getCursorType(CursorIntType.SE, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={false}
			/>
			<Corner
				id={id}
				x={widthState / 2}
				y={heightState}
				cursor={getCursorType(CursorIntType.S, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={false}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={false}
			/>
			<Corner
				id={id}
				x={0}
				y={heightState}
				cursor={getCursorType(CursorIntType.SW, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={true}
				canChangeTop={false}
			/>
			<Corner
				id={id}
				x={0}
				y={heightState / 2}
				cursor={getCursorType(CursorIntType.W, rotation)}
				selectedObject={selectedObject}
				setWidth={setWidth}
				setHeight={setHeight}
				setTop={setTop}
				setLeft={setLeft}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={false}
				canChangeLeft={true}
				canChangeTop={false}
			/>
		</div>
	)
}

export { ObjectSelection }
