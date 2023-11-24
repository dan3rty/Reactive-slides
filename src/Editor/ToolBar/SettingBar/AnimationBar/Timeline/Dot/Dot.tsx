import styles from './Dot.module.css'

type Dot = {
	text: number
	offset: string
	isChosen: boolean
}

function Dot(props: Dot) {
	const { text, offset, isChosen } = props
	const circleStyle = isChosen ? styles.DotCircleChosen : styles.DotCircle
	return (
		<div className={styles.Dot} style={{ left: offset }}>
			<div className={circleStyle}></div>
			<span className={styles.timelineLineDotText}>{text.toFixed(1)}</span>
		</div>
	)
}

export { Dot }
