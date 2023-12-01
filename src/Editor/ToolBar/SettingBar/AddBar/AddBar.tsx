import styles from './AddBar.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import {
	ArrowIcon,
	BulletListIcon,
	ImageIcon,
	NumberedListIcon,
	OvalIcon,
	SquareIcon,
	TableIcon,
	TextIcon,
	TriangleIcon,
} from '../../../../common/Icons/icons'
import { useContext, useRef, useState } from 'react'
import { PresenterContext } from '../../../../presenterContext/PresenterContext'
import { Presenter, Slide } from '../../../../types'
import * as Type from '../../../../types'

function AddBar() {
	const [imagePathInputOpened, setImagePathInputOpened] = useState(false)
	const { presenter, setPresenter, editedSlideRef } = useContext(PresenterContext)
	const rect = editedSlideRef.current.getBoundingClientRect()
	let x1: number
	let y1: number
	let x2: number
	let y2: number
	let currentBlock: string

	const size = window.innerHeight
	const scale = (1080 / (size - 205)) * 1.2

	const imagePathInputRef = useRef(null)
	let imagePathInput = ''
	function useHandleAddUp(event: MouseEvent) {
		document.removeEventListener('mouseup', useHandleAddUp)
		x2 = event.clientX - rect.x
		y2 = event.clientY - rect.y
		const objectToAdd =
			currentBlock === 'rectangle' || currentBlock === 'triangle' || currentBlock === 'oval'
				? {
						blockType: Type.BlockType.PRIMITIVE,
						id: Math.random().toString(16).slice(2),
						primitiveType:
							currentBlock === 'rectangle'
								? Type.Primitives.RECT
								: currentBlock === 'triangle'
								? Type.Primitives.TRIANGLE
								: Type.Primitives.CIRCLE,
						color: {
							colors: [{ hex: '#808080', opacity: 0 }],
						},
						baseState: {
							width: (x1 > x2 ? x1 - x2 : x2 - x1) * scale,
							height: (y1 > y2 ? y1 - y2 : y2 - y1) * scale,
							x: (x1 < x2 ? x1 : x2) * scale,
							y: (y1 < y2 ? y1 : y2) * scale,
							rotation: 0,
						},
						borderSize: 5,
						borderColor: { hex: '#00000', opacity: 0 },
						borderType: Type.BorderTypes.SOLID,
				  }
				: currentBlock === 'image'
				? {
						typeValue: Type.ImageSource.PATH,
						blockType: Type.BlockType.IMAGE,
						id: Math.random().toString(16).slice(2),
						baseState: {
							width: (x1 > x2 ? x1 - x2 : x2 - x1) * scale,
							height: (y1 > y2 ? y1 - y2 : y2 - y1) * scale,
							x: (x1 < x2 ? x1 : x2) * scale,
							y: (y1 < y2 ? y1 : y2) * scale,
							rotation: 0,
						},
						value: imagePathInput,
						opacity: 0,
				  }
				: {
						blockType: Type.BlockType.TEXT,
						id: Math.random().toString(16).slice(2),
						baseState: {
							width: (x1 > x2 ? x1 - x2 : x2 - x1) * scale,
							height: (y1 > y2 ? y1 - y2 : y2 - y1) * scale,
							x: (x1 < x2 ? x1 : x2) * scale,
							y: (y1 < y2 ? y1 : y2) * scale,
							rotation: 0,
						},
						value: [],
				  }
		const slideIndex = presenter.presentation.slides.findIndex(
			(slide) => slide.id === presenter.selection.slideId,
		)
		const newSlide: Slide = {
			...presenter.presentation.slides[slideIndex],
			objects: [...presenter.presentation.slides[slideIndex].objects, objectToAdd],
		}
		const newSlides: Array<Slide> = presenter.presentation.slides
		newSlides[slideIndex] = newSlide
		const newPresenter: Presenter = {
			...presenter,
			selection: {
				...presenter.selection,
				objectsId: [objectToAdd.id],
			},
			presentation: {
				...presenter.presentation,
				slides: newSlides,
			},
		}
		setPresenter(newPresenter)
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
		x1 = event.clientX - rect.x
		y1 = event.clientY - rect.y
		document.addEventListener('mouseup', useHandleAddUp)
	}

	function handleDownInInput(event: MouseEvent) {
		if (event.target !== imagePathInputRef.current) {
			document.removeEventListener('mousedown', handleDownInInput)
			setImagePathInputOpened(false)
		}
	}

	return (
		<div className={styles.addBar}>
			<Button
				style='light'
				size='big'
				icon={TextIcon}
				text='text'
				onClick={() => {
					document.addEventListener('mousedown', handleAddDown)
					currentBlock = 'text'
				}}
			/>
			<Button style='light' size='big' icon={TableIcon} text='table' />
			<Button
				style='light'
				size='big'
				icon={TriangleIcon}
				text='triangle'
				onClick={() => {
					document.addEventListener('mousedown', handleAddDown)
					currentBlock = 'triangle'
				}}
			/>
			<Button style='light' size='big' icon={BulletListIcon} text='bullet list' />
			{!imagePathInputOpened && (
				<Button
					style='light'
					size='big'
					icon={ImageIcon}
					text='image'
					onClick={() => {
						setImagePathInputOpened(true)
						document.addEventListener('mousedown', handleDownInInput)
					}}
				/>
			)}
			{imagePathInputOpened && (
				<input
					className={styles.imagePathInput}
					ref={imagePathInputRef}
					placeholder={'URL to image'}
					onChange={(e) => {
						setImagePathInputOpened(false)
						currentBlock = 'image'
						imagePathInput = e.target.value
						document.addEventListener('mousedown', handleAddDown)
					}}
				/>
			)}
			<Button
				style='light'
				size='big'
				icon={SquareIcon}
				text='rectangle'
				onClick={() => {
					document.addEventListener('mousedown', handleAddDown)
					currentBlock = 'rectangle'
				}}
			/>
			<Button style='light' size='big' icon={NumberedListIcon} text='numbered list' />
			<Button style='light' size='big' icon={ArrowIcon} text='arrow' />
			<Button
				style='light'
				size='big'
				icon={OvalIcon}
				text='oval'
				onClick={() => {
					document.addEventListener('mousedown', handleAddDown)
					currentBlock = 'oval'
				}}
			/>
		</div>
	)
}

export { AddBar }
