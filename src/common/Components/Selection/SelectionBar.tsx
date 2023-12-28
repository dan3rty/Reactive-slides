import React, { ReactNode } from 'react'
import styles from './SelectionBar.css'
import { SelectionButton } from '../Buttons/SelectionButton'

type buttonInfo = {
	icon: ReactNode
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

type SelectionProps = {
	propsOfButtons: Array<buttonInfo>
}

function SelectionBar({ propsOfButtons }: SelectionProps) {
	return (
		<div className={styles.selection}>
			{propsOfButtons.map((props, index) => (
				<SelectionButton
					key={index}
					style={'light'}
					icon={props.icon}
					onClick={props.onClick}
				/>
			))}
		</div>
	)
}

export { SelectionBar }
