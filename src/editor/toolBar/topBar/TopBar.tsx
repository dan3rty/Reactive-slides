import React, { useContext } from 'react'
import styles from './TopBar.module.css'
import { presentation } from '../../../App'
function TopBar() {
	return (
		<div className={styles.topBar}>
			<div>
				<span className={styles.logo}>Reactive slides</span>
			</div>
			<span className={styles.presentationName}>
				{useContext(presentation).presentation.title}
			</span>
		</div>
	)
}

export { TopBar }
