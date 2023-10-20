import React from 'react'
import './EditBar.css'
import { InputField } from '../../../../common/components/inputFields/InputField'

function EditBar() {
	return (
		<div className="add-bar">
			<InputField label={'X:'} type={'number'} size={'large'} suffix={'px'}></InputField>
		</div>
	)
}

export { EditBar }
