import { ObjectStateList } from '../../../../../types'
import { Dot } from './Dot/Dot'
import styles from './Timeline.css'

type TimelineProps = {
	animation?: ObjectStateList
	chosenState?: string
}

function Timeline(props: TimelineProps) {
	const { animation, chosenState } = props
	const objectsToRender = animation?.stateList.map(({ keyPercent, id }) => {
		const percent = keyPercent / 100
		const text = animation.duration * percent
		const offset = `${keyPercent}%`
		const isChosen = id === chosenState
		return { text, offset, isChosen }
	})

	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineLine}>
				<Dot text={0} isChosen={!chosenState} offset={'0'}></Dot>
				{objectsToRender?.map((circle, index) => {
					const { text, offset, isChosen } = circle
					return <Dot key={index} text={text} offset={offset} isChosen={isChosen}></Dot>
				})}
			</div>
		</div>
	)
}

export { Timeline }
