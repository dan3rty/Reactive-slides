import React from 'react'
import { Button } from '../../../../common/Components/Buttons/Button'
import { InputField } from '../../../../common/Components/InputFields/InputField'
import { FontFamilySelection } from '../../../../common/Components/Selection/FontFamilySelection'
import { SelectionBar } from '../../../../common/Components/Selection/SelectionBar'
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
} from '../../../../common/Icons/icons'
import { FontFamily } from '../../../../types'
import style from './EditBar.module.css'

function EditBar() {
	const log = () => {
		console.log('pop')
	}
	return (
		<div className={style.editBar}>
			<div className={style.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={544}
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
			<div className={style.mediumContainer}>
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
			<div className={style.mediumContainer}>
				<InputField
					label={'Font size:'}
					type={'number'}
					size={'Medium'}
					initialValue={35}
					suffix={'px'}
				></InputField>
				<FontFamilySelection value={FontFamily.ARIAL} />
				<div className={style.buttonHorizontalContainer}>
					<Button text={'Text color'} style={'light'} size={'medium'} onClick={log} />
					<Button text={'Background'} style={'light'} size={'medium'} onClick={log} />
				</div>
			</div>
			<div className={style.buttonVerticalContainer}>
				<Button style={'light'} size={'small'} icon={BoldIcon} onClick={log} />
				<Button style={'light'} size={'small'} icon={ItalicIcon} onClick={log} />
				<Button style={'light'} size={'small'} icon={UnderstrokeIcon} onClick={log} />
				<Button style={'light'} size={'small'} icon={StrokethroughIcon} onClick={log} />
			</div>
			<div className={style.selectionWrapper}>
				<Button
					text={'clear'}
					style={'light'}
					size={'medium'}
					icon={BoldIcon}
					onClick={log}
				/>
				<SelectionBar icons={[AlignRightIcon, AlignCenterIcon, AlignLeftIcon]} />
				<SelectionBar icons={[AlignTopIcon, VerticalAlignCenterIcon, AlignBottomIcon]} />
			</div>
		</div>
	)
}

export { EditBar }
