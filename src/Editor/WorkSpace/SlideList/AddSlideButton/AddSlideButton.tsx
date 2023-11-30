import styles from './AddSlideButton.css'
import { AddSlideButtonIcon } from '../../../../common/Icons/icons'

type AddSlideButtonProps = {
	scale: number
}
function AddSlideButton(props: AddSlideButtonProps) {
	const width = 1920 / props.scale
	return (
		<div
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
