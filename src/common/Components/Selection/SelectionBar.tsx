import { ReactNode } from 'react'
import styles from './SelectionBar.css'
import { SelectionButton } from '../Buttons/SelectionButton'

type SelectionProps = {
	icons: Array<ReactNode>
}

function SelectionBar({ icons }: SelectionProps) {
	return (
		<div className={styles.selection}>
			{icons.map((icon, index) => (
				<SelectionButton key={index} style={'light'} icon={icon} />
			))}
		</div>
	)
}

export { SelectionBar }
