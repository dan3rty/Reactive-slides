import React from 'react'
import styles from './AddBar.module.css'
import { Button } from '../../../../common/Components/Buttons/Button'
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
} from '../../../../common/Icons/icons'

function AddBar() {
	const log = () => {
		console.log('pop')
	}
	return (
		<div className={styles.addBar}>
			<Button style='light' size='big' icon={TextIcon} text='text' onClick={log} />
			<Button style='light' size='big' icon={TableIcon} text='table' onClick={log} />
			<Button style='light' size='big' icon={TriangleIcon} text='triangle' onClick={log} />
			<Button
				style='light'
				size='big'
				icon={BulletListIcon}
				text='bullet list'
				onClick={log}
			/>
			<Button style='light' size='big' icon={ImageIcon} text='image' onClick={log} />
			<Button style='light' size='big' icon={SquareIcon} text='rectangle' onClick={log} />
			<Button
				style='light'
				size='big'
				icon={NumberedListIcon}
				text='numbered list'
				onClick={log}
			/>
			<Button style='light' size='big' icon={ArrowIcon} text='arrow' onClick={log} />
			<Button style='light' size='big' icon={OvalIcon} text='oval' onClick={log} />
		</div>
	)
}

export { AddBar }
