import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { useState } from 'react'
import { useUndoRedoListeners } from '../hooks/useUndoRedoListeners'

function Editor() {
	const [slideRect, setSlideRect] = useState<DOMRect>(null)
	useUndoRedoListeners()
	return (
		<div className={styles.app}>
			<ToolBar slideRect={slideRect} />
			<WorkSpace setSlideRect={setSlideRect} />
		</div>
	)
}

export { Editor }
