import { useContext } from 'react'
import styles from './TopBar.css'
import { PresenterContext } from '../../../App'
function TopBar() {
	return (
		<div className={styles.topBar}>
			<div>
				<span className={styles.logo}>Reactive slides</span>
			</div>
			<span className={styles.presentationName}>
				{useContext(PresenterContext).presenter.presentation.title}
			</span>
		</div>
	)
}

export { TopBar }
