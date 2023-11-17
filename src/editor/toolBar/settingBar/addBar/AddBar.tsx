import React from 'react'
import styles from './AddBar.module.css'
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
		<div className={styles.addBar}>
			<Button style='light' size='big' icon={TextIcon} text='text'></Button>
			<Button style='light' size='big' icon={TableIcon} text='table'></Button>
			<Button style='light' size='big' icon={TriangleIcon} text='triangle'></Button>
			<Button style='light' size='big' icon={BulletListIcon} text='bullet list'></Button>
			<Button style='light' size='big' icon={ImageIcon} text='image'></Button>
			<Button style='light' size='big' icon={SquareIcon} text='rectangle'></Button>
			<Button style='light' size='big' icon={NumberedListIcon} text='numbered list'></Button>
			<Button style='light' size='big' icon={ArrowIcon} text='arrow'></Button>
			<Button style='light' size='big' icon={OvalIcon} text='oval'></Button>
		</div>
	)
}

export { AddBar }
