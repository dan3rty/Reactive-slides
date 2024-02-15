import styles from './AddSlideButton.css'
import { AddSlideButtonIcon } from '../../../../common/Icons/icons'
import { useAppActions, useAppSelector } from '../../../../redux/hooks'

type AddSlideButtonProps = {
	scale: number
}

const SLIDE_WIDTH = 1920
function AddSlideButton({ scale }: AddSlideButtonProps) {
	const width = SLIDE_WIDTH / scale
	const selection = useAppSelector((state) => state.selection)
	const slideId = selection.slideId
	const { createAddSlideAction } = useAppActions()
	return (
		<div
			onClick={() => createAddSlideAction(slideId)}
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
