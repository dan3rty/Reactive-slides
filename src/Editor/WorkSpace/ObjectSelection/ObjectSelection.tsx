import { ImageBlock, PrimitiveBlock, TextBlock } from '../../../types'
import styles from './ObjectSelection.css'
import { useResizableObject } from '../../../hooks/useResizableObject'
import { useEffect, useRef } from 'react'

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
}

function Corner({ x, y, cursor }: CornerProps) {
	const { registerResizableItem } = useResizableObject()
	const size = 5
	const cornerRef = useRef<HTMLDivElement>(null)
	const objectRef = useRef(null)

	useEffect(() => {
		const { onDragStart } = registerResizableItem({ cornerRef, objectRef })

		const onMouseDown = (mouseDownEvent: MouseEvent) => {
			onDragStart({
				onDrag: (dragEvent) => {
					cornerRef.current!.style.position = 'absolute'
					cornerRef.current!.style.top = `${
						dragEvent.clientY - mouseDownEvent.clientY + y - size
					}px`
					cornerRef.current!.style.left = `${
						dragEvent.clientX - mouseDownEvent.clientX + x - size
					}px`
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
			style={{ position: 'absolute', top: y - size, left: x - size, cursor: cursor }}
		></div>
	)
}

type ObjectSelectionProps = {
	selectedObjects: Array<TextBlock | ImageBlock | PrimitiveBlock>
	scale: number
}

function ObjectSelection({ selectedObjects, scale }: ObjectSelectionProps) {
	const selections = selectedObjects.map((object) => {
		const { width, height, x, y, rotation } = object.baseState
		const borderSize = 3
		return (
			<div
				className={styles.selection}
				style={{
					rotate: rotation + 'deg',
					borderWidth: `${borderSize}px`,
					top: y / scale - borderSize,
					left: x / scale - borderSize,
					width: width / scale,
					height: height / scale,
				}}
			>
				<Corner x={0} y={0} cursor={getCursorType(CursorIntType.NW, rotation)} />
				<Corner
					x={width / scale / 2}
					y={0}
					cursor={getCursorType(CursorIntType.N, rotation)}
				/>
				<Corner
					x={width / scale}
					y={0}
					cursor={getCursorType(CursorIntType.NE, rotation)}
				/>
				<Corner
					x={width / scale}
					y={height / scale / 2}
					cursor={getCursorType(CursorIntType.E, rotation)}
				/>
				<Corner
					x={width / scale}
					y={height / scale}
					cursor={getCursorType(CursorIntType.SE, rotation)}
				/>
				<Corner
					x={width / scale / 2}
					y={height / scale}
					cursor={getCursorType(CursorIntType.S, rotation)}
				/>
				<Corner
					x={0}
					y={height / scale}
					cursor={getCursorType(CursorIntType.SW, rotation)}
				/>
				<Corner
					x={0}
					y={height / scale / 2}
					cursor={getCursorType(CursorIntType.W, rotation)}
				/>
			</div>
		)
	})
	return <>{selections}</>
}

export { ObjectSelection }
