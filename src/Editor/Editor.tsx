import { useContext } from 'react'
import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { PresenterContext } from '../App'

function Editor() {
	const context = useContext(PresenterContext).presenter
	const selectedSlide = context.presentation.slides.find(
		(slide) => slide.id === context.selection.slideId,
	)
	return (
		<div className={styles.app}>
			<ToolBar />
			{selectedSlide && <WorkSpace selectedSlide={selectedSlide} />}
		</div>
	)
}

export { Editor }
