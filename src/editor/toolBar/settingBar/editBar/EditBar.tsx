import React from 'react'
import { Button } from '../../../../common/components/buttons/Button'
import { InputField } from '../../../../common/components/inputFields/InputField'
import { FontFamilySelection } from '../../../../common/components/selection/FontFamilySelection'
import { SelectionBar } from '../../../../common/components/selection/SelectionBar'
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
import { FontFamily } from '../../../../types'
import './EditBar.css'

function EditBar() {
	// const slides = useContext(presentation).presentation.slides
	// const slideId = useContext(presentation).selection.slideId
	// const slide = slides.filter((slide) => slide.id == slideId)[0]
	// const objectsId = useContext(presentation).selection.objectsId
	// let selectedObjects
	// if (objectsId) {
	// 	selectedObjects = slide.objects.filter((object) => objectsId.includes(object.id))
	// }
	return (
		<div className='edit-bar'>
			<div className={'big-container'}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'large'}
					initialValue={0}
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
				<FontFamilySelection value={FontFamily.ARIAL}></FontFamilySelection>
				<div className={'button-horizontal-container'}>
					<Button text={'Text color'} style={'light'} size={'medium'} />
					<Button text={'Background'} style={'light'} size={'medium'} />
				</div>
			</div>
			<div className={'button-vertical-container'}>
				<Button style={'light'} size={'small'} icon={BoldIcon} />
				<Button style={'light'} size={'small'} icon={ItalicIcon} />
				<Button style={'light'} size={'small'} icon={UnderstrokeIcon} />
				<Button style={'light'} size={'small'} icon={StrokethroughIcon} />
			</div>
			<div className={'selection-wrapper'}>
				<Button text={'clear'} style={'light'} size={'medium'} icon={BoldIcon} />
				<SelectionBar
					firstIcon={AlignRightIcon}
					secondIcon={AlignCenterIcon}
					thirdIcon={AlignLeftIcon}
				/>
				<SelectionBar
					firstIcon={AlignTopIcon}
					secondIcon={VerticalAlignCenterIcon}
					thirdIcon={AlignBottomIcon}
				/>
			</div>
		</div>
	)
}

export { EditBar }
