import { useRef } from 'react'
import styles from './TopBar.css'
import { useAppActions, useAppSelector } from '../../../redux/hooks'
function TopBar() {
	const title = useAppSelector((state) => state.title)
	const { createChangeTitleAction } = useAppActions()
	const ref = useRef<HTMLSpanElement>(null)
	return (
		<div className={styles.topBar}>
			<div>
				<span className={styles.logo}>Reactive slides</span>
			</div>
			<span
				ref={ref}
				contentEditable={true}
				className={styles.presentationName}
				onInput={() => createChangeTitleAction(ref.current.innerText)}
			>
				{title}
			</span>
		</div>
	)
}

export { TopBar }
