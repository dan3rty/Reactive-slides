import { useEffect, useRef, useState } from 'react'
import { joinCssClasses } from '../../../../classes/joinCssClasses'
import { SlideRenderer } from '../../../../common/SlideEditor/SlideRenderer'
import { RegisterDndItemFn } from '../../../../hooks/useDraggableList'
import { Selection, Slide } from '../../../../types'
import { Counter } from './Counter/Counter'
import { DeleteButton } from './DeleteButton/DeleteButton'
import styles from './SlidePreview.css'

type SlidePreviewProps = {
	index: number
	scale: number
	slide: Slide
	selection: Selection
	createOnClick: (objectId: string) => () => void
	deleteOnClick: () => void
	registerDndItem: RegisterDndItemFn
}

function SlidePreview({
	index,
	scale,
	slide,
	selection,
	createOnClick,
	registerDndItem,
	deleteOnClick,
}: SlidePreviewProps) {
	const ref = useRef<HTMLDivElement>(null)
	const isChosen = slide.id == selection.slideId
	const [isHovering, setIsHovering] = useState(false)
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
		return () => control.removeEventListener('mousedown', onMouseDown)
	}, [index, registerDndItem])
	return (
		<div
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			ref={ref}
			key={index}
			className={joinCssClasses(styles.smallSlide, isChosen ? styles.smallSlideChosen : null)}
			onClick={createOnClick(slide.id)}
		>
			<SlideRenderer
				scale={scale}
				slide={slide}
				isWorkspace={false}
				createOnClick={createOnClick}
				selection={selection}
			/>
			<div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}></div>
			<Counter index={index + 1}></Counter>
			{isHovering && <DeleteButton deleteSlideOnClick={deleteOnClick}></DeleteButton>}
		</div>
	)
}

export { SlidePreview }
