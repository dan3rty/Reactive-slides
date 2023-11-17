import React from 'react'
import { InputField } from '../../../../common/components/inputFields/InputField'
import './AnimationBar.css'
import { Button } from '../../../../common/components/buttons/Button'
import { Timeline } from './timeline/Timeline'

function AnimationBar() {
	return (
		<div className={'animation-bar'}>
			<div className={'big-container'}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={576}
					suffix={'px'}
				></InputField>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={397}
					suffix={'px'}
				></InputField>
			</div>
			<div className={'medium-container'}>
				<InputField
					label={'Rotation:'}
					type={'number'}
					size={'Medium'}
					initialValue={0}
					suffix={'deg'}
				></InputField>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={300}
					suffix={'px'}
				></InputField>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
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
						size={'Small'}
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
