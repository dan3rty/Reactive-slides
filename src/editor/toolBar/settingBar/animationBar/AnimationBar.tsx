import React from 'react'
import { InputField } from '../../../../common/components/inputFields/InputField'
import './AnimationBar.css'
import { Button } from '../../../../common/components/buttons/Button'
import { Timeline } from '../../../../common/components/timeline/Timeline'

function AnimationBar() {
	return (
		<div className={'animation-bar'}>
			<div className={'big-container'}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'large'}
					initialValue={576}
					suffix={'px'}
				></InputField>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'large'}
					initialValue={397}
					suffix={'px'}
				></InputField>
			</div>
			<div className={'medium-container'}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'medium'}
					initialValue={0}
					suffix={'deg'}
				></InputField>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'medium'}
					initialValue={300}
					suffix={'px'}
				></InputField>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'medium'}
					initialValue={100}
					suffix={'px'}
				></InputField>
			</div>
			<div className={'medium-container'}>
				<div className={'horizontal-container'}>
					<InputField
						label={'Duration:'}
						type={'number'}
						initialValue={13.5}
						size={'small'}
						suffix={'sec'}
					></InputField>
					<Button text={'add keyframe'} style={'dark'} size={'large'} />
					<Button text={'delete keyframe'} style={'dark'} size={'large'} />
				</div>
				<Timeline />
			</div>
		</div>
	)
}

export { AnimationBar }
