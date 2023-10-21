import React from 'react'
import './EditBar.css'
import { InputField } from '../../../../common/components/inputFields/InputField'

function EditBar() {
	return (
		<div className="add-bar">
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
	)
}

export { EditBar }
