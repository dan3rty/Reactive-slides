import { ReactElement, useContext, useState } from 'react'
import { MultipleColorPicker } from './multipleColorPicker/MultipleColorPicker'
import styles from './ChangeBackgroundPopup.css'
import { PresenterContext } from '../../presenterContext/PresenterContext'
import { GradientColor } from '../../types'

function ChangeBackgroundPopup() {
	const [backgroundType, setBackgroundType] = useState('none')

	const { presenter, setPresenter } = useContext(PresenterContext)

	function setGradientBackground(color: GradientColor) {
		const chosenSlideId = presenter.selection.slideId
		const newPresentation = structuredClone({
			...presenter,
			presentation: {
				...presenter.presentation,
				slides: presenter.presentation.slides.map((slide) => {
					if (slide.id !== chosenSlideId) {
						return slide
					}
					return {
						...slide,
						background: {
							color,
						},
					}
				}),
			},
		})
		setPresenter(newPresentation)
	}

	let window: ReactElement
	switch (backgroundType) {
		case 'gradient':
			window = <MultipleColorPicker onColorPick={setGradientBackground} />
			break
		case 'none':
			window = <ChoseBackgroundType setBackgroundType={(color) => setBackgroundType(color)} />
			break
	}
	return <div>{window}</div>
}

type ChoseBackgroundTypeProps = {
	setBackgroundType: (type: string) => void
}

function ChoseBackgroundType({ setBackgroundType }: ChoseBackgroundTypeProps) {
	return (
		<div className={styles.chose}>
			<div
				className={styles.pickButton}
				onClick={() => {
					setBackgroundType('image')
				}}
			>
				image
			</div>
			<div
				className={styles.pickButton}
				onClick={() => {
					setBackgroundType('gradient')
				}}
			>
				gradient
			</div>
		</div>
	)
}

export { ChangeBackgroundPopup }
