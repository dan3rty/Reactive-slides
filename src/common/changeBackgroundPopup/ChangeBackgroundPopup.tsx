import { ReactElement, useState } from 'react'
import { MultipleColorPicker } from './multipleColorPicker/MultipleColorPicker'
import styles from './ChangeBackgroundPopup.css'

function ChangeBackgroundPopup() {
	const [backgroundType, setBackgroundType] = useState('none')

	let window: ReactElement
	switch (backgroundType) {
		case 'gradient':
			window = <MultipleColorPicker />
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
