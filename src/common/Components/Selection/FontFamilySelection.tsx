import { FontFamily } from '../../../types'
import styles from './FontFamilySelection.module.css'

type FontFamilySelectionProps = {
	value: FontFamily
}

function FontFamilySelection(props: FontFamilySelectionProps) {
	return (
		<div className={styles.selectionField}>
			<div className={styles.selectionFieldLabel}>
				<span>Font family:</span>
			</div>
			<div className={styles.selectionFieldValue}>
				<span>{props.value}</span>
			</div>
		</div>
	)
}

export { FontFamilySelection }
