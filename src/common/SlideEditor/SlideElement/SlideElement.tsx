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
	slideRef?: React.MutableRefObject<HTMLDivElement>
	currentAnimation?: number
}

function SlideElement({
	object,
	isWorkspace,
	slideId,
	scale,
	slideRef,
	currentAnimation,
}: SlideElementProps) {
	const selection = useAppSelector((state) => state.selection)
	const selected = selection.objectId == object.id
	const { createChangeObjectSelectionAction } = useAppActions()
	const onClick = isWorkspace ? () => createChangeObjectSelectionAction(object.id) : () => {}
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
				width:
					!currentAnimation || currentAnimation == 0
						? `${object.baseState.width / scale}px`
						: `${object.animation[currentAnimation].state.width / scale}px`,
				height:
					!currentAnimation || currentAnimation == 0
						? `${object.baseState.height / scale}px`
						: `${object.animation[currentAnimation].state.height / scale}px`,
				top:
					!currentAnimation || currentAnimation == 0
						? `${object.baseState.y / scale}px`
						: `${object.animation[currentAnimation].state.y / scale}px`,
				left:
					!currentAnimation || currentAnimation == 0
						? `${object.baseState.x / scale}px`
						: `${object.animation[currentAnimation].state.x / scale}px`,
				rotate: `${object.baseState.rotation}deg`,
				transition:
					currentAnimation &&
					currentAnimation != 0 &&
					`all ${object.animation[currentAnimation].duration} ease`,
			}}
		>
			{element}
			{selected && isWorkspace && (
				<ObjectSelection
					slideRef={slideRef}
					scale={scale}
					selectedObject={ref}
					object={object}
					slideId={slideId}
					keyframeId={selection.keyFrameId}
				/>
			)}
		</div>
	)
}

export { SlideElement }
