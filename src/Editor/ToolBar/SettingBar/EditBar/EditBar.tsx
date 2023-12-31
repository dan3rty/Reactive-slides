import { useEffect, useRef, useState } from 'react'
import { ColorPicker } from '../../../../common/changeBackgroundPopup/colorPicker/ColorPicker'
import { Button } from '../../../../common/Components/Buttons/Button'
import { DropDownList } from '../../../../common/Components/DropDownList/DropDownList'
import { InputField } from '../../../../common/Components/InputFields/InputField'
import { SelectionBar } from '../../../../common/Components/Selection/SelectionBar'
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	StrokethroughIcon,
	UnderstrokeIcon,
} from '../../../../common/Icons/icons'
import { FONTS } from '../../../../Fonts'
import { BlockType, HorizontalAligns } from '../../../../model/types'
import { useAppActions, useAppSelector } from '../../../../redux/hooks'
import styles from './EditBar.css'

function EditBar() {
	const [isTextColorPicker, setStateTextColorPicker] = useState(false)
	const [isPrimitiveColorPicker, setStatePrimitiveColorPicker] = useState(false)

	const presenter = useAppSelector((state) => state)
	const selection = presenter.selection
	const slides = presenter.presentation.slides
	const selectedObject = slides
		.find((slide) => slide.id === selection.slideId)
		.objects.find((obj) => obj.id == selection.objectId)
	const isTextBlock = selectedObject.blockType === 'text'
	const isPrimitiveBlock = selectedObject.blockType === 'primitive'
	let isBold = false
	let isItalic = false
	let isUnderstroke = false
	let isStrokethrough = false
	if (selectedObject.blockType === BlockType.TEXT) {
		isBold = selectedObject.bold
		isItalic = selectedObject.italic
		isUnderstroke = selectedObject.underline
		isStrokethrough = selectedObject.strokethrough
	}
	const toggleTextColorPickerState = () => setStateTextColorPicker((state) => !state)
	const togglePrimitiveColorPickerState = () => setStatePrimitiveColorPicker((state) => !state)
	const textColorPickerRef = useRef(null)
	const primitiveColorPickerRef = useRef(null)

	const buttonContainerEl = useRef<HTMLDivElement>(null)

	const handleWindowClick = (event: MouseEvent) => {
		if (textColorPickerRef.current && !textColorPickerRef.current.contains(event.target)) {
			setStateTextColorPicker(false)
		}
		if (
			primitiveColorPickerRef.current &&
			!primitiveColorPickerRef.current.contains(event.target)
		) {
			setStateTextColorPicker(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleWindowClick)
		return () => document.removeEventListener('mousedown', handleWindowClick)
	}, [])
	const { createChangeObjectAction } = useAppActions()
	return (
		<div className={styles.editBar}>
			<div className={styles.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={Math.floor(selectedObject.baseState.x)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								x: Number(value),
							},
						})
					}}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={Math.floor(selectedObject.baseState.y)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								y: Number(value),
							},
						})
					}}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject.baseState.width)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								width: Number(value),
							},
						})
					}}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject.baseState.height)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								height: Number(value),
							},
						})
					}}
				/>
			</div>
			<div className={styles.mediumContainer}>
				{isTextBlock && (
					<InputField
						label={'Font size:'}
						type={'number'}
						size={'Medium'}
						initialValue={
							selectedObject.blockType === BlockType.TEXT
								? selectedObject.fontSize
								: 0
						}
						suffix={'px'}
						onChange={(value) => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									fontSize: Number(value),
								})
							}
						}}
					></InputField>
				)}
				{isTextBlock && (
					<DropDownList
						choices={FONTS.map((font) => ({
							name: font,
							returnValue: font,
						}))}
						header={'chose font'}
						onChoice={(font) => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									fontFamily: font,
								})
							}
						}}
					/>
				)}
				{isPrimitiveBlock && (
					<Button
						text={'Figure color'}
						style={'light'}
						size={'medium'}
						onClick={togglePrimitiveColorPickerState}
					/>
				)}
				<div className={styles.buttonHorizontalContainer} ref={buttonContainerEl}>
					{isTextColorPicker && (
						<div
							ref={textColorPickerRef}
							className={styles.colorPicker}
							style={{
								top:
									buttonContainerEl.current.offsetHeight +
									buttonContainerEl.current.offsetTop +
									10,
								left: buttonContainerEl.current.offsetLeft,
							}}
						>
							<ColorPicker
								onColorPick={(color) => {
									if (selectedObject.blockType === BlockType.TEXT) {
										createChangeObjectAction(
											selection.slideId,
											selectedObject.id,
											{
												color: {
													hsl: color,
													opacity: 1,
													percent: '100%',
												},
											},
										)
									}
								}}
							/>
						</div>
					)}
					{isPrimitiveColorPicker && (
						<div
							ref={primitiveColorPickerRef}
							className={styles.colorPicker}
							style={{
								top:
									buttonContainerEl.current.offsetHeight +
									buttonContainerEl.current.offsetTop +
									10,
								left: buttonContainerEl.current.offsetLeft,
							}}
						>
							<ColorPicker
								onColorPick={(color) => {
									if (selectedObject.blockType === BlockType.PRIMITIVE) {
										createChangeObjectAction(
											selection.slideId,
											selectedObject.id,
											{
												color: {
													hsl: color,
													opacity: 1,
													percent: '100%',
												},
											},
										)
									}
								}}
							/>
						</div>
					)}
				</div>
			</div>
			{isTextBlock && (
				<div className={styles.buttonVerticalContainer}>
					<Button
						style={isBold ? 'dark' : 'light'}
						size={'small'}
						icon={BoldIcon}
						onClick={() => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									bold: !selectedObject.bold,
								})
							}
						}}
					/>
					<Button
						style={isItalic ? 'dark' : 'light'}
						size={'small'}
						icon={ItalicIcon}
						onClick={() => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									italic: !selectedObject.italic,
								})
							}
						}}
					/>
					<Button
						style={isUnderstroke ? 'dark' : 'light'}
						size={'small'}
						icon={UnderstrokeIcon}
						onClick={() => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									underline: !selectedObject.underline,
								})
							}
						}}
					/>
					<Button
						style={isStrokethrough ? 'dark' : 'light'}
						size={'small'}
						icon={StrokethroughIcon}
						onClick={() => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									strokethrough: !selectedObject.strokethrough,
								})
							}
						}}
					/>
				</div>
			)}
			{isTextBlock && (
				<div className={styles.selectionWrapper}>
					<Button
						text={'clear'}
						style={'light'}
						size={'medium'}
						onClick={() => {
							if (selectedObject.blockType === BlockType.TEXT) {
								createChangeObjectAction(selection.slideId, selectedObject.id, {
									bold: false,
									italic: false,
									underline: false,
									strokethrough: false,
								})
							}
						}}
					/>
					<SelectionBar
						propsOfButtons={[
							{
								icon: AlignRightIcon,
								onClick: () => {
									if (selectedObject.blockType === BlockType.TEXT) {
										createChangeObjectAction(
											selection.slideId,
											selectedObject.id,
											{
												horizontalAlign: HorizontalAligns.RIGHT,
											},
										)
									}
								},
							},
							{
								icon: AlignCenterIcon,
								onClick: () => {
									if (selectedObject.blockType === BlockType.TEXT) {
										createChangeObjectAction(
											selection.slideId,
											selectedObject.id,
											{
												horizontalAlign: HorizontalAligns.CENTER,
											},
										)
									}
								},
							},
							{
								icon: AlignLeftIcon,
								onClick: () => {
									if (selectedObject.blockType === BlockType.TEXT) {
										createChangeObjectAction(
											selection.slideId,
											selectedObject.id,
											{
												horizontalAlign: HorizontalAligns.LEFT,
											},
										)
									}
								},
							},
						]}
					/>
					{isTextBlock && (
						<Button
							text={'Text color'}
							style={'light'}
							size={'medium'}
							onClick={toggleTextColorPickerState}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export { EditBar }
