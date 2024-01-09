import styles from './ObjectSelection.css'
import { useResizableObject } from '../../../hooks/useResizableObject'
import React, { useEffect, useRef } from 'react'
import { useDraggableObject } from '../../../hooks/useDraggableObject'
import { useAppActions, useAppSelector } from '../../../redux/hooks'
import { BlockType, ImageBlock, PrimitiveBlock, TextBlock } from '../../../model/types'

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
	x: string
	y: string
	cursor: CursorType
	selectedObject: React.MutableRefObject<SVGSVGElement | HTMLDivElement>
	slideId: string
	objectId: string
	scale: number
	canChangeWidth: boolean
	canChangeHeight: boolean
	canChangeTop: boolean
	canChangeLeft: boolean
	keyframeId: string
	object: TextBlock | ImageBlock | PrimitiveBlock
}

function Corner({
	x,
	y,
	cursor,
	selectedObject,
	slideId,
	objectId,
	scale,
	canChangeWidth,
	canChangeLeft,
	canChangeHeight,
	canChangeTop,
	keyframeId,
	object,
}: CornerProps) {
	const { createChangeObjectAction } = useAppActions()
	const { registerResizableItem } = useResizableObject()
	const size = 6
	const cornerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const { onDragStart } = registerResizableItem()

		const onMouseDown = (mouseDownEvent: MouseEvent) => {
			const startWidth = parseFloat(selectedObject.current.style.width)
			const startHeight = parseFloat(selectedObject.current.style.height)
			const startTop = parseFloat(selectedObject.current.style.top)
			const startLeft = parseFloat(selectedObject.current.style.left)
			onDragStart({
				onDrag: (dragEvent) => {
					if (canChangeWidth && !canChangeLeft) {
						const newWidth = startWidth + dragEvent.clientX - mouseDownEvent.clientX
						if (newWidth < 0) {
							selectedObject.current.style.left = startLeft + newWidth + 'px'
							selectedObject.current.style.width = -newWidth + 'px'
						} else {
							selectedObject.current.style.width = newWidth + 'px'
						}
					}

					if (canChangeHeight && !canChangeTop) {
						const newHeight = startHeight + dragEvent.clientY - mouseDownEvent.clientY
						if (newHeight < 0) {
							selectedObject.current.style.top = startTop + newHeight + 'px'
							selectedObject.current.style.height = -newHeight + 'px'
						} else {
							selectedObject.current.style.height = newHeight + 'px'
						}
					}

					if (canChangeTop) {
						const newTop = startTop + dragEvent.clientY - mouseDownEvent.clientY
						const newHeight = startHeight - (dragEvent.clientY - mouseDownEvent.clientY)
						selectedObject.current.style.top = newTop + 'px'
						selectedObject.current.style.height = newHeight + 'px'
					}

					if (canChangeLeft) {
						selectedObject.current.style.left =
							startLeft + dragEvent.clientX - mouseDownEvent.clientX + 'px'
						selectedObject.current.style.width =
							startWidth - (dragEvent.clientX - mouseDownEvent.clientX) + 'px'
					}
				},
				onDrop: () => {
					const x = parseFloat(selectedObject.current.style.left) * scale
					const y = parseFloat(selectedObject.current.style.top) * scale
					const width = parseFloat(selectedObject.current.style.width) * scale
					const height = parseFloat(selectedObject.current.style.height) * scale
					const newBaseState = {
						...object.baseState,
						x,
						y,
						width,
						height,
					}
					if (keyframeId) {
						createChangeObjectAction(slideId, objectId, {
							baseState: newBaseState,
						})
					} else {
						console.log('mew', object.animation.stateList)
						const newStateList = object.animation.stateList.map((state) => {
							if (state.id === keyframeId) {
								return {
									...state,
									state: newBaseState,
								}
							}
							return state
						})
						createChangeObjectAction(slideId, objectId, {
							animation: {
								...object.animation,
								stateList: newStateList,
							},
						})
					}
				},
			})
		}

		const control = cornerRef.current!
		control.addEventListener('mousedown', onMouseDown)
		return () => control.removeEventListener('mousedown', onMouseDown)
	}, [registerResizableItem, object])

	return (
		<div
			ref={cornerRef}
			className={styles.corner}
			style={{
				position: 'absolute',
				top: `calc(${y} - ${size / 2}px)`,
				left: `calc(${x} - ${size - 1.5}px)`,
				cursor: cursor,
			}}
		></div>
	)
}

type ObjectSelectionProps = {
	selectedObject: React.MutableRefObject<SVGSVGElement | HTMLDivElement>
	object: ImageBlock | PrimitiveBlock | TextBlock
	slideId: string
	scale: number
	slideRef: React.MutableRefObject<HTMLDivElement>
}

function ObjectSelection({
	selectedObject,
	object,
	slideId,
	scale,
	slideRef,
}: ObjectSelectionProps) {
	if (!selectedObject.current) {
		return null
	}
	const selection = useAppSelector((state) => state).selection
	const slides = useAppSelector((state) => state).presentation.slides
	const slideObject = slides
		.find((slide) => slide.id == slideId)
		.objects.find((obj) => obj.id == object.id)
	console.log(slideObject.animation.stateList)
	const ref = useRef(null)
	const selectionRef = useRef<HTMLDivElement>(null)
	const { startMoving } = useDraggableObject({
		elementRef: ref,
		elementId: object.id,
		slideId,
	})

	const rotation = selectedObject.current.style.rotate
		? parseFloat(selectedObject.current.style.rotate)
		: 0
	const borderSize = 3

	const cursorMoveOffset = 0.05
	const onMouseMove = (e: MouseEvent) => {
		const height = selectionRef.current.clientHeight
		const width = selectionRef.current.clientWidth
		const yOffset = height * cursorMoveOffset
		const xOffset = width * cursorMoveOffset
		const offset = Math.min(xOffset, yOffset)
		if (
			e.offsetY > offset &&
			e.offsetY < height - offset &&
			e.offsetX > offset &&
			e.offsetX < width - offset
		) {
			if (object.blockType === BlockType.TEXT) {
				selectionRef.current.style.cursor = 'text'
				ref.current.style.display = 'none'
				return
			}
		}
		selectionRef.current.style.cursor = 'move'
		ref.current.style.display = 'block'
	}

	const { createClearObjectSelectionAction } = useAppActions()

	const onMouseDown = (e: MouseEvent) => {
		if (e.target != ref.current && e.target == slideRef.current) {
			createClearObjectSelectionAction()
		}
	}

	useEffect(() => {
		selectionRef.current?.addEventListener('mousemove', (e: MouseEvent) => onMouseMove(e))
		document.addEventListener('mousedown', onMouseDown)
		ref.current?.addEventListener('mousedown', startMoving)
		return () => {
			selectionRef.current?.removeEventListener('mousemove', (e) => onMouseMove(e))
			document.removeEventListener('mousedown', onMouseDown)
			ref.current?.removeEventListener('mousedown', startMoving)
		}
	}, [startMoving, onMouseDown])

	const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (object.blockType === BlockType.TEXT && selectionRef.current.style.cursor == 'text') {
			const textArea = selectedObject.current.children[0].children[0] as HTMLTextAreaElement

			const canvas = document.createElement('canvas')
			const canvasContext = canvas.getContext('2d')
			canvasContext.font = `${textArea.style.fontSize} ${textArea.style.fontFamily}`
			const text = textArea.value
			const textMetrics = canvasContext.measureText(text)

			const cols = textArea.clientWidth / textMetrics.actualBoundingBoxAscent
			const lines = Math.ceil(text.length / cols)
			const clickX = event.clientX
			const clickY = event.clientY

			const textareaRect = textArea.getBoundingClientRect()
			const textareaX = textareaRect.left
			const textareaY = textareaRect.top

			const relativeX = clickX - textareaX
			const relativeY = clickY - textareaY

			const charIndex = Math.floor(relativeX / (textArea.clientWidth / cols))

			const lineIndex = Math.floor(relativeY / (textArea.clientHeight / lines))

			const cursorPosition = charIndex + lineIndex * cols
			textArea.setSelectionRange(cursorPosition, cursorPosition)
			textArea.focus()
		}
	}

	return (
		<div
			ref={selectionRef}
			className={styles.selection}
			style={{
				borderWidth: `${borderSize}px`,
				top: -borderSize,
				left: -borderSize,
				width: '100%',
				height: '100%',
			}}
			onClick={(event: React.MouseEvent<HTMLDivElement>) => onClick(event)}
		>
			<div ref={ref} className={styles.draggableSpace}></div>
			<Corner
				x={'0%'}
				y={'0%'}
				cursor={getCursorType(CursorIntType.NW, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={true}
				canChangeTop={true}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'50%'}
				y={'0%'}
				cursor={getCursorType(CursorIntType.N, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={false}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={true}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'100%'}
				y={'0%'}
				cursor={getCursorType(CursorIntType.NE, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={true}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'100%'}
				y={'50%'}
				cursor={getCursorType(CursorIntType.E, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={false}
				canChangeLeft={false}
				canChangeTop={false}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'100%'}
				y={'100%'}
				cursor={getCursorType(CursorIntType.SE, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={false}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'50%'}
				y={'100%'}
				cursor={getCursorType(CursorIntType.S, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={false}
				canChangeHeight={true}
				canChangeLeft={false}
				canChangeTop={false}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'0%'}
				y={'100%'}
				cursor={getCursorType(CursorIntType.SW, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={true}
				canChangeLeft={true}
				canChangeTop={false}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
			<Corner
				x={'0%'}
				y={'50%'}
				cursor={getCursorType(CursorIntType.W, rotation)}
				selectedObject={selectedObject}
				slideId={slideId}
				objectId={object.id}
				scale={scale}
				canChangeWidth={true}
				canChangeHeight={false}
				canChangeLeft={true}
				canChangeTop={false}
				keyframeId={selection.keyFrameId}
				object={slideObject}
			/>
		</div>
	)
}

export { ObjectSelection }
