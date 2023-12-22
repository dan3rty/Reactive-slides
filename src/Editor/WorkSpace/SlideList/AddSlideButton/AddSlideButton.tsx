import styles from './AddSlideButton.css'
import { AddSlideButtonIcon } from '../../../../common/Icons/icons'
import { useAppActions } from '../../../../redux/hooks'

type AddSlideButtonProps = {
	scale: number
}
function AddSlideButton({ scale }: AddSlideButtonProps) {
	const width = 1920 / scale //TODO magical number
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
