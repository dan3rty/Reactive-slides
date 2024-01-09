import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { useUndoRedoListeners } from '../hooks/useUndoRedoListeners'
import { useState } from 'react'

function Editor() {
	const [slideRect, setSlideRect] = useState<DOMRect>(null)
	const [editedSlideRef, setEditedSlideRef] = useState<HTMLDivElement>(null)
	useUndoRedoListeners()
	return (
		<div className={styles.app}>
			<ToolBar slideRect={slideRect} editedSlideRef={editedSlideRef} />
			<WorkSpace setSlideRect={setSlideRect} setEditedSlideRef={setEditedSlideRef} />
		</div>
	)
}

export { Editor }
