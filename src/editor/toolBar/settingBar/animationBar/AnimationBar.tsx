import React, { useContext } from 'react'
import { InputField } from '../../../../common/components/inputFields/InputField'
import styles from './AnimationBar.module.css'
import { Button } from '../../../../common/components/buttons/Button'
import { Timeline } from './timeline/Timeline'
import { presentation } from '../../../../App'

function AnimationBar() {
	const chosenSlide = useContext(presentation).selection.slideId
	const chosenObjectId = useContext(presentation).selection.objectsId
	const chosenState = useContext(presentation).selection.keyFrameId
	const curSlide = useContext(presentation).presentation.slides.find(
		(slide) => slide.id === chosenSlide,
	)
	const slideObjects = curSlide?.objects
	const chosenObject = slideObjects?.find((object) => object.id === chosenObjectId[0])
	const animation = chosenObject?.animation
	return (
		<div className={styles.animationBar}>
			<div className={styles.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={576}
					suffix={'px'}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={397}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'Medium'}
					initialValue={0}
					suffix={'deg'}
				/>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={300}
					suffix={'px'}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={100}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<div className={styles.horizontalContainer}>
					<InputField
						label={'Duration:'}
						type={'number'}
						initialValue={13.5}
						size={'Small'}
						suffix={'sec'}
					/>
					<Button text={'add keyframe'} style={'dark'} size={'large'} />
					<Button text={'delete keyframe'} style={'dark'} size={'large'} />
				</div>
				<Timeline animation={animation} chosenState={chosenState}></Timeline>
			</div>
		</div>
	)
}

export { AnimationBar }
