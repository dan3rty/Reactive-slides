import React from 'react'
import './EditBar.css'
import { Button } from '../../../../common/components/buttons/Button'
import { InputField } from '../../../../common/components/inputFields/InputField'
import {
	BoldIcon,
	ItalicIcon,
	StrokethroughButton,
	UnderstrokeIcon,
} from '../../../../common/icons/icons'

function EditBar() {
	return (
		<div className='edit-bar'>
			<div className={'big-container'}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'large'}
					initialValue={544}
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
				<InputField
					label={'Font size:'}
					type={'number'}
					size={'medium'}
					initialValue={35}
					suffix={'px'}
				></InputField>
			</div>
			<div className={'button-vertical-container'}>
				<Button style={'light'} size={'small'} icon={BoldIcon} />
				<Button style={'light'} size={'small'} icon={ItalicIcon} />
				<Button style={'light'} size={'small'} icon={UnderstrokeIcon} />
				<Button style={'light'} size={'small'} icon={StrokethroughButton} />
			</div>
		</div>
	)
}

export { EditBar }
