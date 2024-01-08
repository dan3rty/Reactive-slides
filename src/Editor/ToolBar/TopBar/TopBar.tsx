import React from 'react'
import styles from './TopBar.css'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

function TopBar() {
	const title = useAppSelector((state) => state).presentation.title
	const { createChangeTitleAction, createStartPreviewAction } = useAppActions()
	return (
		<div className={styles.topBar}>
			<div className={styles.leftGroup}>
				<span className={styles.logo}>Reactive slides</span>
				<span
					className={styles.run}
					onClick={() => document.body.requestFullscreen().then(createStartPreviewAction)}
				>
					Run!
				</span>
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
