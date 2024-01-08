import React, { useEffect, useRef, useState } from 'react'
import { joinCssClasses } from '../../../../classes/joinCssClasses'
import { SlideRenderer } from '../../../../common/SlideEditor/SlideRenderer'
import { RegisterDndItemFn, UnregisterDndItemFn } from '../../../../hooks/useDraggableList'
import { Counter } from './Counter/Counter'
import { DeleteButton } from './DeleteButton/DeleteButton'
import styles from './SlidePreview.css'
import { useAppActions, useAppSelector } from '../../../../redux/hooks'

type SlidePreviewProps = {
	slideId: string
	index: number
	scale: number
	registerDndItem: RegisterDndItemFn
	unregisterDndItem: UnregisterDndItemFn
	showDeleteButton: boolean
	setSlideRefList: React.Dispatch<React.SetStateAction<React.MutableRefObject<HTMLDivElement[]>>>
	slideRefList: React.MutableRefObject<HTMLDivElement[]>
}

function SlidePreview({
	slideId,
	index,
	scale,
	registerDndItem,
	unregisterDndItem,
	showDeleteButton,
	setSlideRefList,
	slideRefList,
}: SlidePreviewProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isHovering, setIsHovering] = useState(false)
	const presenter = useAppSelector((state) => state)
	const selection = presenter.selection
	const slides = presenter.presentation.slides
	const slide = slides.find((slide) => slide.id == slideId)
	const isChosen = slide.id == selection.slideId
	const { createDeleteSlideAction, createChangeSlideSelectionAction } = useAppActions()
	const deleteSlideOnClick = () => {
		if (isChosen) {
			const deletedSlide = slides.find((slide) => slide.id === selection.slideId)
			let newSlideId = ''
			if (slides[slides.indexOf(deletedSlide) + 1]) {
				newSlideId = slides[slides.indexOf(deletedSlide) + 1].id
				createChangeSlideSelectionAction(newSlideId)
			} else if (slides[slides.indexOf(deletedSlide) - 1]) {
				newSlideId = slides[slides.indexOf(deletedSlide) - 1].id
				createChangeSlideSelectionAction(newSlideId)
			} else {
				createChangeSlideSelectionAction(newSlideId)
			}
		}
		createDeleteSlideAction(slide.id)
	}

	useEffect(() => {
		if (!registerDndItem) {
			return
		}
		const { onDragStart } = registerDndItem(index, {
			elementRef: ref,
		})

		const onMouseDown = (mouseDownEvent: MouseEvent) => {
			createChangeSlideSelectionAction(slide.id)
			onDragStart({
				onDrag: (dragEvent) => {
					ref.current!.style.position = 'relative'
					ref.current!.style.zIndex = '1'
					ref.current!.style.boxShadow = 'black 2px 2px 4px'
					ref.current!.style.top = `${dragEvent.clientY - mouseDownEvent.clientY}px`
				},
				onDrop: () => {
					ref.current!.style.position = ''
					ref.current!.style.zIndex = ''
					ref.current!.style.boxShadow = ''
					ref.current!.style.top = ''
				},
			})
		}

		const control = ref.current!
		control.addEventListener('mousedown', onMouseDown)
		return () => {
			control.removeEventListener('mousedown', onMouseDown)
			unregisterDndItem(index)
		}
	}, [index, registerDndItem])
	return (
		<div
			onMouseOver={() => setIsHovering(true)}
			onMouseOut={() => setIsHovering(false)}
			ref={ref}
			key={index}
			className={joinCssClasses(styles.smallSlide, isChosen ? styles.smallSlideChosen : null)}
		>
			<SlideRenderer
				scale={scale}
				slideId={slide.id}
				isWorkspace={false}
				setSlideRefList={setSlideRefList}
				slideRefList={slideRefList}
				index={index}
			/>
			<Counter index={index + 1}></Counter>
			{showDeleteButton && isHovering && (
				<DeleteButton deleteSlideOnClick={deleteSlideOnClick}></DeleteButton>
			)}
		</div>
	)
}

export { SlidePreview }
