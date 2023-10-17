import React from 'react'
import './FileSettings.css'
import { Button } from '../../../../common/components/buttons/Button'
import { CreateIcon, OpenIcon, SaveIcon } from '../../../../common/icons/icons'
function FileSettings() {
	return (
		<div className="FileSettings">
			<Button style="dark" size="medium" icon={CreateIcon} text="create new file"></Button>
			<Button style="dark" size="medium" icon={OpenIcon} text="open file"></Button>
			<Button style="dark" size="medium" icon={SaveIcon} text="save file"></Button>
		</div>
	)
}

export { FileSettings }
