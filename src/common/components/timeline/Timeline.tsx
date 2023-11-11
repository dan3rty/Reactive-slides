import React, { useContext } from 'react'
import './Timeline.css'
import { dotIcon } from '../../icons/icons'
import { presentation } from '../../../App'

function Timeline() {
	const chosenSlide = useContext(presentation).selection.slideId
	const chosenObject = useContext(presentation).selection.objectsId
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
				return (
					<div
						className={'timeline-line-dot'}
						style={{ left: lineWidth * percent - offset + 'px' }}
					>
						{dotIcon}
						<span className={'timeline-line-dot-text'}>
							{(duration * percent).toFixed(1)}
						</span>
					</div>
				)
			})
			return (
				<div className={'timeline-container'}>
					<div className={'timeline-line'}>
						<div className={'timeline-line-dot'} style={{ left: -20 + 'px' }}>
							{dotIcon}
							<span className={'timeline-line-dot-text'}>0.0</span>
						</div>
						{objectsToRender}
					</div>
				</div>
			)
		}
		return <div></div>
	}
	return <div></div>
}

export { Timeline }
