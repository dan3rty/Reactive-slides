import React from 'react'
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
			<textarea
				value={title}
				className={styles.presentationName}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					createChangeTitleAction(e.target.value)
				}
				maxLength={30}
			>
				{title}
			</textarea>
		</div>
	)
}

export { TopBar }
