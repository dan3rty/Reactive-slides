import { ImageBlock, PrimitiveBlock, TextBlock } from '../../../types'

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
				style={{
					position: 'absolute',
					rotate: rotation + 'deg',
					border: `#8ab4f89a solid ${borderSize}px`,
					top: y / scale - borderSize,
					left: x / scale - borderSize,
					width: width / scale,
					height: height / scale,
				}}
			></div>
		)
	})
	return <>{selections}</>
}

export { ObjectSelection }
