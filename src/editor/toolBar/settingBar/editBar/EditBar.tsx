import React from 'react'
import './EditBar.css'
import { Button } from '../../../../common/components/buttons/Button'
import { InputField } from '../../../../common/components/inputFields/InputField'
import { Selection } from '../../../../common/components/selection/Selection'
import {
	AlignBottomIcon,
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	AlignTopIcon,
	BoldIcon,
	ItalicIcon,
	StrokethroughIcon,
	UnderstrokeIcon,
	VerticalAlignCenterIcon,
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
				<Button style={'light'} size={'small'} icon={StrokethroughIcon} />
			</div>
			<div className={'selection-wrapper'}>
				<div>
					<Button text={'clear'} style={'light'} size={'medium'} icon={BoldIcon} />
				</div>
				<Selection
					firstIcon={AlignRightIcon}
					secondIcon={AlignCenterIcon}
					thirdIcon={AlignLeftIcon}
				/>
				<Selection
					firstIcon={AlignTopIcon}
					secondIcon={VerticalAlignCenterIcon}
					thirdIcon={AlignBottomIcon}
				/>
			</div>
		</div>
	)
}

export { EditBar }
