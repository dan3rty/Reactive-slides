import { ImageBlock, PrimitiveBlock, TextBlock } from '../../../types'
import styles from './ObjectSelection.css'

type SelectionBorderProps = {
	width: number
	height: number
	x: number
	y: number
	rotation: number
}

function SelectionBorder({ width, height, x, y, rotation }: SelectionBorderProps) {
	return (
		<div
			className={styles.selectionBorder}
			style={{
				width: width,
				height: height,
				top: y + 'px',
				left: x + 'px',
				rotate: `${rotation}deg`,
			}}
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
			<>
				<SelectionBorder
					width={width / scale}
					height={borderSize}
					x={x / scale}
					y={y / scale - borderSize}
					rotation={rotation}
					key={object.id + 'top'}
				/>
				<SelectionBorder
					width={width / scale}
					height={borderSize}
					x={x / scale}
					y={(y + height) / scale}
					rotation={rotation}
					key={object.id + 'bottom'}
				/>
				<SelectionBorder
					width={borderSize}
					height={height / scale}
					x={x / scale - borderSize}
					y={y / scale}
					rotation={rotation}
					key={object.id + 'left'}
				/>
				<SelectionBorder
					width={borderSize}
					height={height / scale}
					x={(x + width) / scale}
					y={y / scale}
					rotation={rotation}
					key={object.id + 'right'}
				/>
			</>
		)
	})
	return <>{selections}</>
}

export { ObjectSelection }
