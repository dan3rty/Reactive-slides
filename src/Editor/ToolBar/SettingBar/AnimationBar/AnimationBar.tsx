import { InputField } from '../../../../common/Components/InputFields/InputField'
import { Slide } from '../../../../types'
import styles from './AnimationBar.module.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { Timeline } from './Timeline/Timeline'

type AnimationBarProps = {
	curSlide?: Slide
	chosenObjectId?: Array<string>
	chosenState?: string
}

function AnimationBar(props: AnimationBarProps) {
	const slideObjects = props.curSlide?.objects
	const chosenObject = slideObjects?.find((object) => object.id === props.chosenObjectId?.[0])
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
				<Timeline animation={animation} chosenState={props.chosenState}></Timeline>
			</div>
		</div>
	)
}

export { AnimationBar }
