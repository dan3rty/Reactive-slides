import { FormEvent } from 'react'
import styles from './TopBar.css'
import { useAppActions, useAppSelector } from '../../../redux/hooks'
function TopBar() {
	const title = useAppSelector((state) => state.title)
	const { createChangeTitleAction } = useAppActions()
	return (
		<div className={styles.topBar}>
			<div>
				<span className={styles.logo}>Reactive slides</span>
			</div>
			<span
				contentEditable={true}
				className={styles.presentationName}
				onInput={(e: FormEvent<HTMLSpanElement>) => {
					createChangeTitleAction(e.currentTarget.textContent)
				}}
				suppressContentEditableWarning={true}
			>
				{title}
			</span>
		</div>
	)
}

export { TopBar }
