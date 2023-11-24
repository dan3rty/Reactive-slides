import React from 'react'
import { ObjectStateList } from '../../../../../types'
import { Dot } from './Dot/Dot'
import styles from './Timeline.module.css'

type TimelineProps = {
	animation?: ObjectStateList
	chosenState?: string
}

function Timeline(props: TimelineProps) {
	const { animation, chosenState } = props
	const objectsToRender = animation?.stateList.map((state, index) => {
		const percent = state.keyPercent / 100
		const text = animation.duration * percent
		const offset = `calc(` + state.keyPercent + '% - ' + (40 * (index + 1) + 20) + `px)`
		const isChosen = state.id === chosenState
		return { text, offset, isChosen }
	})
	const isFirstChosen =
		chosenState === '' ? styles.timelineLineDotCircleChosen : styles.timelineLineDotCircle
	return (
		<div className={styles.timelineContainer}>
			<div className={styles.timelineLine}>
				<Dot text={0} offset={'-3%'} isChosen={isFirstChosen}></Dot>
				{objectsToRender?.map((circle) => {
					const { text, offset, isChosen } = circle
					return <Dot text={text} offset={offset} isChosen={isChosen}></Dot>
				})}
			</div>
		</div>
	)
}

export { Timeline }
