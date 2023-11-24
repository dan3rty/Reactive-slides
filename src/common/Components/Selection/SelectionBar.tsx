import { ReactNode } from 'react'
import styles from './SelectionBar.css'
import { SelectionButton } from '../Buttons/SelectionButton'

type SelectionProps = {
	icons: Array<ReactNode>
}

//TODO: ПРОКИДЫВАТЬ МАССИВ
function SelectionBar(props: SelectionProps) {
	return (
		<div className={styles.selection}>
			{props.icons.map((icon) => (
				<SelectionButton style={'light'} icon={icon} />
			))}
		</div>
	)
}

export { SelectionBar }
