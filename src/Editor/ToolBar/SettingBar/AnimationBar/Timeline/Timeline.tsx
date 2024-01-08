import { Dot } from './Dot/Dot'
import styles from './Timeline.css'
import { ObjectState } from '../../../../../model/types'

type TimelineProps = {
	animation?: Array<ObjectState>
	chosenState?: string
}

const getAnimationDuration = (animation: Array<ObjectState>): number => {
	let animationDuration = 0
	animation.forEach((state) => {
		animationDuration += state.duration
	})
	return animationDuration
}

function Timeline({ animation, chosenState }: TimelineProps) {
	const animationsDuration = getAnimationDuration(animation)
	let percent = 0
	let stateDuration = 0
	const objectsToRender = animation?.map(({ duration, id }) => {
		percent += (duration / animationsDuration) * 100
		const offset = `${percent}%`
		const isChosen = id === chosenState
		stateDuration += duration
		return { stateDuration, offset, isChosen, id }
	})

	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineLine}>
				<Dot duration={0} isChosen={!chosenState} offset={'0'} id={''}></Dot>
				{objectsToRender?.map((circle, index) => {
					const { stateDuration, offset, isChosen, id } = circle
					return (
						<Dot
							key={index}
							duration={stateDuration}
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
