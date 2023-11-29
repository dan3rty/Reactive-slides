import { InputField } from '../../../../common/Components/InputFields/InputField'
import { ImageBlock, PrimitiveBlock, TextBlock } from '../../../../types'
import styles from './AnimationBar.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { Timeline } from './Timeline/Timeline'

type AnimationBarProps = {
	selectedObject: TextBlock | ImageBlock | PrimitiveBlock
	chosenState?: string
}

function AnimationBar({ selectedObject, chosenState }: AnimationBarProps) {
	const animation = selectedObject?.animation
	return (
		<div className={styles.animationBar}>
			<div className={styles.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={selectedObject?.baseState.x}
					suffix={'px'}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={selectedObject?.baseState.y}
					suffix={'px'}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'Medium'}
					initialValue={selectedObject?.baseState.rotation}
					suffix={'deg'}
				/>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={selectedObject?.baseState.width}
					suffix={'px'}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={selectedObject?.baseState.height}
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
