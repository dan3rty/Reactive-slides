import { BlockType, ImageBlock, PrimitiveBlock, TextBlock } from '../../../types'
import { ImageComponent } from '../../SlideObjects/ImageComponent'
import { PrimitiveComponent } from '../../SlideObjects/PrimitiveComponent'
import { TextComponent } from '../../SlideObjects/TextComponent'
import { ObjectSelection } from '../../../Editor/WorkSpace/ObjectSelection/ObjectSelection'
import React from 'react'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

type SlideElementProps = {
	object: TextBlock | PrimitiveBlock | ImageBlock
	isWorkspace: boolean
	slideId: string
	scale: number
}

function SlideElement({ object, isWorkspace, slideId, scale }: SlideElementProps) {
	const selection = useAppSelector((state) => state.selection)
	const selected = selection.objectsId.includes(object.id)
	const { createAddObjectSelectionAction } = useAppActions()
	const onClick = isWorkspace ? () => createAddObjectSelectionAction(object.id) : () => {}
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
				/>
			)
			break
		case BlockType.PRIMITIVE:
			element = <PrimitiveComponent primitive={object} scale={scale} onClick={onClick} />
			break
		case BlockType.TEXT:
			element = (
				<TextComponent
					textId={object.id}
					scale={scale}
					ref={ref as React.ForwardedRef<HTMLDivElement>}
					isWorkSpace={isWorkspace}
					onClick={onClick}
					slideId={slideId}
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
			{selected && isWorkspace && (
				<ObjectSelection
					scale={scale}
					selectedObject={ref}
					id={object.id}
					slideId={slideId}
				/>
			)}
		</div>
	)
}

export { SlideElement }
