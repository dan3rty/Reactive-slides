import { useContext } from 'react'
import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { PresenterContext } from '../App'

function Editor() {
	const { presentation, selection } = useContext(PresenterContext).presenter
	const selectedSlide = presentation.slides.find((slide) => slide.id === selection.slideId)

	return (
		<div className={styles.app}>
			<ToolBar />
			{selectedSlide && <WorkSpace selectedSlide={selectedSlide} />}
		</div>
	)
}

export { Editor }
