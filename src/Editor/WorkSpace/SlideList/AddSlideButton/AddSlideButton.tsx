import styles from './AddSlideButton.css'
import { AddSlideButtonIcon } from '../../../../common/Icons/icons'
import { useAppActions } from '../../../../redux/hooks'

type AddSlideButtonProps = {
	scale: number
}

const SLIDE_WIDTH = 1920
function AddSlideButton({ scale }: AddSlideButtonProps) {
	const width = SLIDE_WIDTH / scale
	const { createAddSlideAction } = useAppActions()
	return (
		<div
			onClick={() => createAddSlideAction()}
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
