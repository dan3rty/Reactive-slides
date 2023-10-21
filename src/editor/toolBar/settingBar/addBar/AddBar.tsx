import React from 'react'
import './AddBar.css'
import { Button } from '../../../../common/components/buttons/Button'
import {
	ArrowIcon,
	BulletListIcon,
	ImageIcon,
	NumberedListIcon,
	OvalIcon,
	SquareIcon,
	TableIcon,
	TextIcon,
	TriangleIcon,
} from '../../../../common/icons/icons'
function AddBar() {
	return (
		<div className='add-bar'>
			<Button style='light' size='medium' icon={TextIcon} text='text'></Button>
			<Button style='light' size='medium' icon={TableIcon} text='table'></Button>
			<Button style='light' size='medium' icon={TriangleIcon} text='triangle'></Button>
			<Button style='light' size='medium' icon={BulletListIcon} text='bullet list'></Button>
			<Button style='light' size='medium' icon={ImageIcon} text='image'></Button>
			<Button style='light' size='medium' icon={SquareIcon} text='rectangle'></Button>
			<Button
				style='light'
				size='medium'
				icon={NumberedListIcon}
				text='numbered list'
			></Button>
			<Button style='light' size='medium' icon={ArrowIcon} text='arrow'></Button>
			<Button style='light' size='medium' icon={OvalIcon} text='oval'></Button>
		</div>
	)
}

export { AddBar }
