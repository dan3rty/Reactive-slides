import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import React, { useState } from 'react'

function Editor() {
	const [slideRect, setSlideRect] = useState<DOMRect>(null)
	const [slideRefList, setSlideRefList] = useState<React.MutableRefObject<HTMLDivElement[]>>({
		current: [],
	})
	return (
		<div className={styles.app}>
			<ToolBar slideRect={slideRect} slideRefList={slideRefList} />
			<WorkSpace
				setSlideRect={setSlideRect}
				setSlideRefList={setSlideRefList}
				slideRefList={slideRefList}
			/>
		</div>
	)
}

export { Editor }
