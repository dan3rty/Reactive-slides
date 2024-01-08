import { Dot } from './Dot/Dot'
import styles from './Timeline.css'
import {ObjectStateList} from '../../../../../types'

type TimelineProps = {
	animation?: ObjectStateList
	chosenState?: string
}

function Timeline({ animation, chosenState }: TimelineProps) {
	const objectsToRender = animation.stateList?.map(({  id, keyPercent }) => {
		const offset = `${keyPercent}%`
		const isChosen = id === chosenState
		return { keyPercent, offset, isChosen, id }
	})

	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineLine}>
				<Dot duration={0} isChosen={!chosenState} offset={'0'} id={''}></Dot>
				{objectsToRender?.map((circle, index) => {
					const { keyPercent, offset, isChosen, id } = circle
					return (
						<Dot
							key={index}
							duration={animation.duration * keyPercent / 100}
							offset={offset}
							isChosen={isChosen}
							id={id}
						></Dot>
					)
				})}
			</div>
		</div>
	)
}

export { Timeline }
