import { FontFamily } from '../../../types'
import styles from './FontFamilySelection.css'

type FontFamilySelectionProps = {
	value: FontFamily
}

function FontFamilySelection({ value }: FontFamilySelectionProps) {
	return (
		<div className={styles.selectionField}>
			<div className={styles.selectionFieldLabel}>
				<span>Font family:</span>
			</div>
			<div className={styles.selectionFieldValue}>
				<span>{value}</span>
			</div>
		</div>
	)
}

export { FontFamilySelection }
