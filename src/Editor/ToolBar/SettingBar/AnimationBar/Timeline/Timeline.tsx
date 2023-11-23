import React from 'react'
import { ObjectStateList } from '../../../../../types'
import { Dot } from './Dot/Dot'
import styles from './Timeline.module.css'

type Timeline = {
	animation: ObjectStateList
	chosenState: string
}

function Timeline(props: Timeline) {
	const { animation, chosenState } = props
	const lineWidth = 500
	let objectsCounter = 0
	const objectsToRender = animation.stateList.map((state) => {
		const percent = state.keyPercent / 100
		const duration = animation.duration * percent
		objectsCounter++
		const offset = lineWidth * percent - objectsCounter * 40 - 20 + 'px'
		const isChosen = state.id === chosenState
		return { duration, offset, isChosen }
	})
	const isFirstChosen =
		chosenState === '' ? styles.timelineLineDotCircleChosen : styles.timelineLineDotCircle
	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineLine}>
				<Dot duration={0} offset={'-20px'} isChosen={isFirstChosen}></Dot>
				{objectsToRender.map((circle) => {
					const { duration, offset, isChosen } = circle
					return <Dot duration={duration} offset={offset} isChosen={isChosen}></Dot>
				})}
			</div>
		</div>
	)
}

export { Timeline }
