import React, { ReactNode } from 'react'
import styles from './SelectionBar.module.css'
import { SelectionButton } from '../buttons/SelectionButton'

type SelectionProps = {
	firstIcon: ReactNode
	secondIcon: ReactNode
	thirdIcon: ReactNode
}

function SelectionBar(props: SelectionProps) {
	return (
		<div className={styles.selection}>
			<SelectionButton style={'light'} icon={props.firstIcon} />
			<div className={styles.selectionBorder}></div>
			<SelectionButton style={'light'} icon={props.secondIcon} />
			<div className={styles.selectionBorder}></div>
			<SelectionButton style={'light'} icon={props.thirdIcon} />
		</div>
	)
}

export { SelectionBar }
