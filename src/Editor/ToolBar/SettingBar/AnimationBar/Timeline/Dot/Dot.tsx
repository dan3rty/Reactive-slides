import styles from './Dot.css'
import { useAppActions } from '../../../../../../redux/hooks'

type Dot = {
	duration: number
	offset?: string
	isChosen: boolean
	id: string
}

function Dot({ duration, offset, isChosen, id }: Dot) {
	const circleStyle = isChosen ? styles.dotCircleChosen : styles.dotCircle
	const { createChangeKeyframeSelectionAction } = useAppActions()

	return (
		<div className={styles.dot} style={{ left: offset }}>
			<div
				className={circleStyle}
				onClick={() => createChangeKeyframeSelectionAction(id)}
			></div>
			<span className={styles.timelineLineDotText}>{+duration.toFixed(2)}</span>
		</div>
	)
}

export { Dot }
