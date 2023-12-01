import { useContext, useEffect, useRef, useState } from 'react'
import { useDraggableList } from '../../../hooks/useDraggableList'
import styles from './SlideList.css'
import { SlideRenderer } from '../../../common/SlideEditor/SlideRenderer'
import { Counter } from './Counter/Counter'
import { joinCssClasses } from '../../../classes/joinCssClasses'
import { Background, Color, GradientColor, Presentation, Selection, Slide, Tabs } from '../../../types'
import { PresenterContext } from '../../../App'
import { AddSlideButton } from './AddSlideButton/AddSlideButton'

function generateBlankSlide() {
	const gradientColor: Color = {
		hex: '#000000',
		opacity: 0,
	}
	const gradientColor2: Color = {
		hex: '#e52222',
		opacity: 0,
	}
	const backgroundGradient: GradientColor = {
		colors: [gradientColor, gradientColor2],
	}
	const background: Background = {
		color: backgroundGradient,
	}
	const newSlide: Slide = {
		id: 'pip75474sgf', //TODO: Нужен генератор ID и вообще прибраться в создании слайда
		background: background,
		objects: [],
	}
	return newSlide
}

type SlideListProps = {
	scale: number
	createOnClick: (objectId: string) => () => void
}
function SlideList({ scale }: SlideListProps) {
	const ref = useRef<HTMLDivElement>(null)
	const { presenter, setPresenter } = useContext(PresenterContext)
	const { presentation, selection, operationHistory } = presenter
	const slides: Array<Slide> = presentation.slides
	const [chosen, setChosen] = useState(selection.slideId)
	const {
		registerDndItem,
	} = useDraggableList({
		onOrderChange: (from, to) => {
			const newSlides = [...slides]
			const removed = newSlides.splice(from, 1)
			newSlides.splice(to, 0, removed[0])
			const newPresentation: Presentation = {
				...presentation,
				slides: newSlides
			}
			setPresenter({presentation: newPresentation, selection, operationHistory})
		}
	})


	const createOnClick = (slideId: string) => {
		return () => {
			setChosen(slideId)
			const newSelection: Selection = {
				selectedTab: Tabs.CREATE,
				objectsId: [],
				slideId,
			}
			setPresenter({ presentation, selection: newSelection, operationHistory })
		}
	}

	const createSlideOnClick = () => {
		const newSlide = generateBlankSlide()
		let oldSlides = presentation.slides
		const newPresentation: Presentation = {
			...presentation,
			slides: oldSlides.concat(newSlide),
		}
		setPresenter({ presentation: newPresentation, selection, operationHistory })
	}

	const slidesToRender = slides.map((slide, index) => {
		const ref = useRef<HTMLDivElement>(null)
		const isChosen = slide.id == chosen
		const slideScale = isChosen ? scale * 3.5 : scale * 4

		useEffect(() => {
			if (!registerDndItem) {
				return;
			}
			const {
				onDragStart,
			} = registerDndItem(index, {
				elementRef: ref,
			})

			const onMouseDown = (mouseDownEvent: MouseEvent) => {
				onDragStart({
					onDrag: dragEvent => {
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
				ref={ref}
				key={index}
				className={joinCssClasses(
					styles.smallSlide,
					isChosen ? styles.smallSlideChosen : null,
				)}
				onClick={createOnClick(slide.id)}
			>
				<SlideRenderer
					scale={slideScale}
					slide={slide}
					isWorkspace={false}
					createOnClick={createOnClick}
					selection={selection}
				/>
				<Counter index={index + 1}></Counter>
			</div>
		)
	})

	return (
		<div ref={ref} className={styles.slideList}>
			{slidesToRender}
			<AddSlideButton scale={scale * 4} createSlideOnClick={createSlideOnClick} />
		</div>
	)
}

export { SlideList }
