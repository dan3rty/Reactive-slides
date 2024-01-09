import { DeleteButtonIcon } from '../../../../../common/Icons/icons'
import styles from './DeleteButton.css'

type DeleteButtonProps = {
	deleteSlideOnClick: () => void
}
function DeleteButton({ deleteSlideOnClick }: DeleteButtonProps) {
	return (
		<div onClick={deleteSlideOnClick} className={styles.deleteSlide}>
			{DeleteButtonIcon}
		</div>
	)
}

export { DeleteButton }
