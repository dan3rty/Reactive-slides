import { ImageBlock, PrimitiveBlock, TextBlock } from '../../../types'
import styles from './ObjectSelection.css'

type SelectionBorderProps = {
	width: number
	height: number
	scale: number
	x: number
	y: number
	rotation: number
}

function SelectionBorder({ width, height, scale, x, y, rotation }: SelectionBorderProps) {
	console.log(scale)
	return (
		<div
			className={styles.selectionBorder}
			style={{ width: width, height: height, top: x, left: y, rotate: `${rotation}deg` }}
		></div>
	)
}

type ObjectSelectionProps = {
	selectedObjects: Array<TextBlock | ImageBlock | PrimitiveBlock>
	scale: number
}

function ObjectSelection({ selectedObjects, scale }: ObjectSelectionProps) {
	console.log(selectedObjects)
	const selections = selectedObjects.map((object) => {
		const { width, height, x, y, rotation } = object.baseState
		console.log(height)
		return (
			<>
				<SelectionBorder
					width={width}
					height={1}
					scale={scale}
					x={x}
					y={y - 1}
					rotation={rotation}
				/>
			</>
		)
	})
	return <>{selections}</>
}

export { ObjectSelection }
