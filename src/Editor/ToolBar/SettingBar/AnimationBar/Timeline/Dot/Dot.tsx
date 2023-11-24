import styles from './Dot.css'

type Dot = {
	text: number
	offset: string
	isChosen: boolean
}

function Dot(props: Dot) {
	const { text, offset, isChosen } = props
	const circleStyle = isChosen ? styles.dotCircleChosen : styles.dotCircle
	return (
		<div className={styles.dot} style={{ left: offset }}>
			<div className={circleStyle}></div>
			<span className={styles.timelineLineDotText}>{text.toFixed(1)}</span>
		</div>
	)
}

export { Dot }
