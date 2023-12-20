import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'

function Editor() {
	return (
		<div className={styles.app}>
			<ToolBar />
			<WorkSpace />
		</div>
	)
}

export { Editor }
