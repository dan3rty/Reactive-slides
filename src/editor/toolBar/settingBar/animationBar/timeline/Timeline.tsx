import React, { useContext } from 'react'
import styles from './Timeline.module.css'
import { presentation } from '../../../../../App'

function Timeline() {
	const chosenSlide = useContext(presentation).selection.slideId
	const chosenObject = useContext(presentation).selection.objectsId
	const chosenState = useContext(presentation).selection.keyFrameId
	const curSlide = useContext(presentation).presentation.slides.find(
		(slide) => slide.id === chosenSlide,
	)
	if (curSlide && chosenObject) {
		const slideObjects = curSlide.objects
		const curObject = slideObjects.find((object) => object.id === chosenObject[0])
		const lineWidth = 500
		let objectsCounter = 0
		if (curObject && curObject.animation) {
			const duration = curObject.animation.duration
			const objectsToRender = curObject.animation.stateList.map((state) => {
				objectsCounter++
				const percent = state.keyPercent / 100
				const offset = objectsCounter * 40 + 20
				if (state.id === chosenState) {
					return (
						<div
							className={styles.timelineLineDot}
							style={{ left: lineWidth * percent - offset + 'px' }}
						>
							<div className={styles.timelineLineDotCircleChosen}></div>
							<span className={styles.timelineLineDotText}>
								{(duration * percent).toFixed(1)}
							</span>
						</div>
					)
				} else {
					return (
						<div
							className={styles.timelineLineDot}
							style={{ left: lineWidth * percent - offset + 'px' }}
						>
							<div className={styles.timelineLineDotCircle}></div>
							<span className={styles.timelineLineDotText}>
								{(duration * percent).toFixed(1)}
							</span>
						</div>
					)
				}
			})
			if (chosenState === '') {
				return (
					<div className={styles.timelineContainer}>
						<div className={styles.timelineLine}>
							<div className={styles.timelineLineDot} style={{ left: -20 + 'px' }}>
								<div className={styles.timelineLineDotCircleChosen}></div>
								<span className={styles.timelineLineDotText}>0.0</span>
							</div>
							{objectsToRender}
						</div>
					</div>
				)
			} else {
				return (
					<div className={styles.timelineContainer}>
						<div className={styles.timelineLine}>
							<div className={styles.timelineLineDot} style={{ left: -20 + 'px' }}>
								<div className={styles.timelineLineDotCircle}></div>
								<span className={styles.timelineLineDotText}>0.0</span>
							</div>
							{objectsToRender}
						</div>
					</div>
				)
			}
		}
		return <div></div>
	}
	return <div></div>
}

export { Timeline }
