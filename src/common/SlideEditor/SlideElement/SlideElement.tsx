import { BlockType, ImageBlock, PrimitiveBlock, TextBlock } from '../../../types'
import { ImageComponent } from '../../SlideObjects/ImageComponent'
import { PrimitiveComponent } from '../../SlideObjects/PrimitiveComponent'
import { TextComponent } from '../../SlideObjects/TextComponent'
import { ObjectSelection } from '../../../Editor/WorkSpace/ObjectSelection/ObjectSelection'
import React from 'react'

type SlideElementProps = {
	object: TextBlock | PrimitiveBlock | ImageBlock
	isWorkspace: boolean
	slideId: string
	scale: number
	selected: boolean
	onClick: () => void
}

function SlideElement({
	object,
	isWorkspace,
	slideId,
	scale,
	selected,
	onClick,
}: SlideElementProps) {
	const ref = React.useRef()
	let element
	switch (object.blockType) {
		case BlockType.IMAGE:
			element = (
				<ImageComponent
					isWorkspace={isWorkspace}
					slideId={slideId}
					image={object}
					scale={scale}
					onClick={onClick}
					ref={ref as React.ForwardedRef<HTMLImageElement>}
				/>
			)
			break
		case BlockType.PRIMITIVE:
			element = <PrimitiveComponent primitive={object} scale={scale} onClick={onClick} />
			break
		case BlockType.TEXT:
			element = (
				<TextComponent
					isWorkspace={isWorkspace}
					slideId={slideId}
					text={object}
					scale={scale}
					onClick={onClick}
					ref={ref as React.ForwardedRef<HTMLDivElement>}
				/>
			)
			break
	}
	return (
		<div
			ref={ref}
			style={{
				position: 'absolute',
				width: `${object.baseState.width / scale}px`,
				height: `${object.baseState.height / scale}px`,
				top: `${object.baseState.y / scale}px`,
				left: `${object.baseState.x / scale}px`,
				rotate: `${object.baseState.rotation}deg`,
			}}
		>
			{element}
			{selected && (
				<ObjectSelection
					selectedObject={ref}
					id={object.id}
					scale={scale}
					slideId={slideId}
				/>
			)}
		</div>
	)
}

export { SlideElement }
