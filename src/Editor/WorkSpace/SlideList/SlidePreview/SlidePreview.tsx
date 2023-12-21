import { useEffect, useRef, useState } from 'react'
import { joinCssClasses } from '../../../../classes/joinCssClasses'
import { SlideRenderer } from '../../../../common/SlideEditor/SlideRenderer'
import { RegisterDndItemFn, UnregisterDndItemFn } from '../../../../hooks/useDraggableList'
import { Counter } from './Counter/Counter'
import { DeleteButton } from './DeleteButton/DeleteButton'
import styles from './SlidePreview.css'
import { useAppActions, useAppSelector } from '../../../../redux/hooks'

type SlidePreviewProps = {
	index: number
	scale: number
	createOnClick: (slideId: string) => () => void
	registerDndItem: RegisterDndItemFn
	unregisterDndItem: UnregisterDndItemFn
	showDeleteButton: boolean
}

function SlidePreview({
	index,
	scale,
	createOnClick,
	registerDndItem,
	unregisterDndItem,
	showDeleteButton,
}: SlidePreviewProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isHovering, setIsHovering] = useState(false)
	const selection = useAppSelector((state) => state.selection)
	const slides = useAppSelector((state) => state.slides)
	const slide = slides[index]
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
	const handleMouseOver = () => {
		setIsHovering(true)
	}
	const handleMouseOut = () => {
		setIsHovering(false)
	}
	useEffect(() => {
		if (!registerDndItem) {
			return
		}
		const { onDragStart } = registerDndItem(index, {
			elementRef: ref,
		})

		const onMouseDown = (mouseDownEvent: MouseEvent) => {
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
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			ref={ref}
			key={index}
			className={joinCssClasses(styles.smallSlide, isChosen ? styles.smallSlideChosen : null)}
		>
			<SlideRenderer
				selectOnClick={createOnClick(slide.id)}
				scale={scale}
				slideId={slide.id}
				isWorkspace={false}
			/>
			<Counter index={index + 1}></Counter>
			{showDeleteButton && isHovering && (
				<DeleteButton deleteSlideOnClick={deleteSlideOnClick}></DeleteButton>
			)}
		</div>
	)
}

export { SlidePreview }
