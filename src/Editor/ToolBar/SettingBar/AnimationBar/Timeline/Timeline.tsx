import { ObjectStateList } from '../../../../../types'
import { Dot } from './Dot/Dot'
import styles from './Timeline.css'

type TimelineProps = {
	animation?: ObjectStateList
	chosenState?: string
}

function Timeline(props: TimelineProps) {
	const { animation, chosenState } = props
	const objectsToRender = animation?.stateList.map(({keyPercent, id}, index) => {
		const percent = keyPercent / 100
		const text = animation.duration * percent
		const dotBlockWidth = 40
		const pxOffset = (dotBlockWidth * (index + 1) + dotBlockWidth / 2)
		const offset = `calc(${keyPercent}% - ${pxOffset}px)`
		const isChosen = id === chosenState
		return { text, offset, isChosen }
	})
	const isFirstChosen =
		chosenState === '' ? styles.timelineLineDotCircleChosen : styles.timelineLineDotCircle
	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineLine}>
				<Dot text={0} offset={'-3%'} isChosen={!!isFirstChosen}></Dot>
				{objectsToRender?.map((circle, index) => {
					const { text, offset, isChosen } = circle
					return <Dot key={index} text={text} offset={offset} isChosen={isChosen}></Dot>
				})}
			</div>
		</div>
	)
}

export { Timeline }
