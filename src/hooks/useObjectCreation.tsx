import * as Type from '../types'
import { ImageBlock, PrimitiveBlock, TextBlock } from '../types'
import { useAppActions, useAppSelector } from '../redux/hooks'

type useObjectCreationProps = {
	rect?: DOMRect
}

function useObjectCreation({ rect }: useObjectCreationProps): {
	handleAddDown: (event: MouseEvent) => void
	setBlockType: (v: string) => void
	setImagePathInput: (v: string) => void
} {
	const { createAddObjectAction, createClearObjectSelectionAction } = useAppActions()
	const selection = useAppSelector((state) => state.selection)
	let firstPosition = { x: 0, y: 0 }
	let secondPosition = { x: 0, y: 0 }
	let blockType = 'oval'

	function setBlockType(type: string) {
		blockType = type
	}

	function setFirstPosition(position: { x: number; y: number }) {
		firstPosition = position
	}

	function setSecondPosition(position: { x: number; y: number }) {
		secondPosition = position
	}

	let imagePathInput = ''
	function setImagePathInput(path: string) {
		imagePathInput = path
	}
	function useHandleAddUp(event: MouseEvent) {
		document.removeEventListener('mouseup', useHandleAddUp)
		const size = window.innerHeight
		const scale = (1080 / (size - 205)) * 1.2
		setSecondPosition({
			x: event.clientX - rect.x,
			y: event.clientY - rect.y,
		})
		const objectToAdd =
			blockType === 'rectangle' || blockType === 'triangle' || blockType === 'oval'
				? ({
						blockType: Type.BlockType.PRIMITIVE,
						id: Math.random().toString(16).slice(2),
						primitiveType:
							blockType === 'rectangle'
								? Type.Primitives.RECT
								: blockType === 'triangle'
								? Type.Primitives.TRIANGLE
								: Type.Primitives.CIRCLE,
						color: {
							colors: [{ hsl: '#808080', opacity: 0 }],
						},
						baseState: {
							width:
								(firstPosition.x > secondPosition.x
									? firstPosition.x - secondPosition.x
									: secondPosition.x - firstPosition.x) * scale,
							height:
								(firstPosition.y > secondPosition.y
									? firstPosition.y - secondPosition.y
									: secondPosition.y - firstPosition.y) * scale,
							x:
								(firstPosition.x < secondPosition.x
									? firstPosition.x
									: secondPosition.x) * scale,
							y:
								(firstPosition.y < secondPosition.y
									? firstPosition.y
									: secondPosition.y) * scale,
							rotation: 0,
						},
						borderSize: 5,
						borderColor: { hsl: '#00000', opacity: 0 },
						borderType: Type.BorderTypes.SOLID,
				  } as PrimitiveBlock)
				: blockType === 'image'
				? ({
						typeValue: Type.ImageSource.PATH,
						blockType: Type.BlockType.IMAGE,
						id: Math.random().toString(16).slice(2),
						baseState: {
							width:
								(firstPosition.x > secondPosition.x
									? firstPosition.x - secondPosition.x
									: secondPosition.x - firstPosition.x) * scale,
							height:
								(firstPosition.y > secondPosition.y
									? firstPosition.y - secondPosition.y
									: secondPosition.y - firstPosition.y) * scale,
							x:
								(firstPosition.x < secondPosition.x
									? firstPosition.x
									: secondPosition.x) * scale,
							y:
								(firstPosition.y < secondPosition.y
									? firstPosition.y
									: secondPosition.y) * scale,
							rotation: 0,
						},
						value: imagePathInput,
						opacity: 0,
				  } as ImageBlock)
				: ({
						blockType: Type.BlockType.TEXT,
						id: Math.random().toString(16).slice(2),
						baseState: {
							width:
								(firstPosition.x > secondPosition.x
									? firstPosition.x - secondPosition.x
									: secondPosition.x - firstPosition.x) * scale,
							height:
								(firstPosition.y > secondPosition.y
									? firstPosition.y - secondPosition.y
									: secondPosition.y - firstPosition.y) * scale,
							x:
								(firstPosition.x < secondPosition.x
									? firstPosition.x
									: secondPosition.x) * scale,
							y:
								(firstPosition.y < secondPosition.y
									? firstPosition.y
									: secondPosition.y) * scale,
							rotation: 0,
						},
						value: [],
				  } as TextBlock)

		createClearObjectSelectionAction()
		createAddObjectAction(selection.slideId, objectToAdd)
	}

	function handleAddDown(event: MouseEvent) {
		event.preventDefault()
		document.removeEventListener('mousedown', handleAddDown)
		if (
			rect.x > event.x ||
			rect.x + rect.width < event.x ||
			rect.y > event.y ||
			rect.y + rect.height < event.y
		) {
			return
		}
		setFirstPosition({
			x: event.clientX - rect.x,
			y: event.clientY - rect.y,
		})
		console.log({
			x: event.clientX - rect.x,
			y: event.clientY - rect.y,
		})
		console.log(firstPosition)
		document.addEventListener('mouseup', useHandleAddUp)
	}

	return { handleAddDown, setBlockType, setImagePathInput }
}

export { useObjectCreation }
