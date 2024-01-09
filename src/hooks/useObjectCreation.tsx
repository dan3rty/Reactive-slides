import * as Type from '../model/types'
import {
	HorizontalAligns,
	ImageBlock,
	PrimitiveBlock,
	TextBlock,
	VerticalAligns,
} from '../model/types'
import { useAppActions, useAppSelector } from '../redux/hooks'

type useObjectCreationProps = {
	rect?: DOMRect
	editedSlideRef?: HTMLDivElement
}

const SLIDE_HEIGHT = 1080
const TOOLBAR_HEIGHT = 205
const WORKSPACE_SCALER = 1.2

function createObjectToAdd(blockType, imageValue, firstPosition, secondPosition, scale) {
	return blockType === 'rectangle' || blockType === 'triangle' || blockType === 'oval'
		? ({
				blockType: Type.BlockType.PRIMITIVE,
				animation: {
					duration: 0,
					looped: false,
					stateList: [],
				},
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
						(firstPosition.x < secondPosition.x ? firstPosition.x : secondPosition.x) *
						scale,
					y:
						(firstPosition.y < secondPosition.y ? firstPosition.y : secondPosition.y) *
						scale,
					rotation: 0,
				},
				borderSize: 5,
				borderColor: { hsl: '#00000', opacity: 0 },
				borderType: Type.BorderTypes.SOLID,
		  } as PrimitiveBlock)
		: blockType === 'image'
		? ({
				blockType: Type.BlockType.IMAGE,
				animation: {
					duration: 0,
					looped: false,
					stateList: [],
				},
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
						(firstPosition.x < secondPosition.x ? firstPosition.x : secondPosition.x) *
						scale,
					y:
						(firstPosition.y < secondPosition.y ? firstPosition.y : secondPosition.y) *
						scale,
					rotation: 0,
				},
				value: imageValue,
				opacity: 0,
		  } as ImageBlock)
		: ({
				blockType: Type.BlockType.TEXT,
				animation: {
					duration: 0,
					looped: false,
					stateList: [],
				},
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
						(firstPosition.x < secondPosition.x ? firstPosition.x : secondPosition.x) *
						scale,
					y:
						(firstPosition.y < secondPosition.y ? firstPosition.y : secondPosition.y) *
						scale,
					rotation: 0,
				},
				value: '',
				fontSize: 20,
				fontFamily: Type.FontFamily.ARIAL,
				bold: false,
				italic: false,
				underline: false,
				strokethrough: false,
				color: {
					hsl: '#000000',
					opacity: 1,
					percent: '100%',
				},
				horizontalAlign: HorizontalAligns.LEFT,
				verticalAlign: VerticalAligns.TOP,
		  } as TextBlock)
}

function useObjectCreation({ rect, editedSlideRef }: useObjectCreationProps): {
	handleAddDown: (event: MouseEvent) => void
	setBlockType: (v: string) => void
	setImageValue: (v: string) => void
} {
	const { createAddObjectAction, createChangeObjectSelectionAction } = useAppActions()
	const selection = useAppSelector((state) => state.selection)
	const previewObject: HTMLDivElement = document.createElement('div')
	previewObject.style.border = '1px solid #000000'
	previewObject.style.position = 'absolute'
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

	let imageValue = ''
	function setImageValue(path: string) {
		imageValue = path
	}
	function useHandleAddUp(event: MouseEvent) {
		document.removeEventListener('mouseup', useHandleAddUp)
		document.removeEventListener('mousemove', handleMouseMove)
		editedSlideRef.removeChild(previewObject)
		const size = window.innerHeight
		const scale = (SLIDE_HEIGHT / (size - TOOLBAR_HEIGHT)) * WORKSPACE_SCALER
		setSecondPosition({
			x: event.clientX - rect.x,
			y: event.clientY - rect.y,
		})
		const objectToAdd = createObjectToAdd(
			blockType,
			imageValue,
			firstPosition,
			secondPosition,
			scale,
		)

		createChangeObjectSelectionAction(objectToAdd.id)
		createAddObjectAction(selection.slideId, objectToAdd)
	}

	function handleMouseMove(event: MouseEvent) {
		const secondPosition = {
			x: event.clientX - rect.x,
			y: event.clientY - rect.y,
		}
		if (firstPosition.x < secondPosition.x && firstPosition.y < secondPosition.y) {
			previewObject.style.width = secondPosition.x - firstPosition.x + 'px'
			previewObject.style.height = secondPosition.y - firstPosition.y + 'px'
		} else if (firstPosition.x < secondPosition.x && firstPosition.y > secondPosition.y) {
			previewObject.style.top = secondPosition.y + 'px'
			previewObject.style.width = secondPosition.x - firstPosition.x + 'px'
			previewObject.style.height = firstPosition.y - secondPosition.y + 'px'
		} else if (firstPosition.x > secondPosition.x && firstPosition.y < secondPosition.y) {
			previewObject.style.left = secondPosition.x + 'px'
			previewObject.style.width = firstPosition.x - secondPosition.x + 'px'
			previewObject.style.height = secondPosition.y - firstPosition.y + 'px'
		} else if (firstPosition.x > secondPosition.x && firstPosition.y > secondPosition.y) {
			previewObject.style.left = secondPosition.x + 'px'
			previewObject.style.top = secondPosition.y + 'px'
			previewObject.style.width = firstPosition.x - secondPosition.x + 'px'
			previewObject.style.height = firstPosition.y - secondPosition.y + 'px'
		}
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
		editedSlideRef.appendChild(previewObject)
		previewObject.style.left = firstPosition.x + 'px'
		previewObject.style.top = firstPosition.y + 'px'
		document.addEventListener('mouseup', useHandleAddUp)
		document.addEventListener('mousemove', handleMouseMove)
	}

	return { handleAddDown, setBlockType, setImageValue }
}

export { useObjectCreation }
