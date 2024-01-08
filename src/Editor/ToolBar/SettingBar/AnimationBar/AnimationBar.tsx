import { InputField } from '../../../../common/Components/InputFields/InputField'
import styles from './AnimationBar.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { Timeline } from './Timeline/Timeline'
import { useAppSelector } from '../../../../redux/hooks'

function AnimationBar() {
	const presenter = useAppSelector((state) => state)
	const selection = presenter.selection
	const slides = presenter.presentation.slides
	const selectedObject = slides
		.find((slide) => slide.id === selection.slideId)
		.objects.find((obj) => obj.id == selection.objectId)
	const animation = selectedObject?.animation
	return (
		<div className={styles.animationBar}>
			<div className={styles.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={Math.floor(selectedObject?.baseState.x)}
					suffix={'px'}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={Math.floor(selectedObject?.baseState.y)}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject?.baseState.rotation)}
					suffix={'deg'}
				/>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject?.baseState.width)}
					suffix={'px'}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject?.baseState.height)}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<div className={styles.horizontalContainer}>
					<InputField
						label={'Duration:'}
						type={'number'}
						initialValue={5}
						size={'Small'}
						suffix={'sec'}
					/>
					<Button text={'add keyframe'} style={'dark'} size={'large'} />
					<Button text={'delete keyframe'} style={'dark'} size={'large'} />
				</div>
				<Timeline animation={animation} chosenState={selection.keyFrameId}></Timeline>
			</div>
		</div>
	)
}

export { AnimationBar }
