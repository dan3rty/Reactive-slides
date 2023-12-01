import styles from './AddSlideButton.css'
import { AddSlideButtonIcon } from '../../../../common/Icons/icons'

type AddSlideButtonProps = {
	scale: number
	createSlideOnClick: () => void
}
function AddSlideButton({scale, createSlideOnClick}: AddSlideButtonProps) {
	const width = 1920 / scale
	return (
		<div
			onClick={createSlideOnClick}
			className={styles.addSlide}
			style={{
				width: `${width}px`,
			}}
		>
			{AddSlideButtonIcon}
			<span>create slide</span>
		</div>
	)
}

export { AddSlideButton }
