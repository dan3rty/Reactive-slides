import { useContext } from 'react'
import styles from '../common/Styles/App.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import { PresenterContext } from '../App'
import { useAppSelector } from '../redux/hooks'

function Editor() {
	const { selection } = useContext(PresenterContext).presenter
	const slides = useAppSelector((state) => state.slides)
	const selectedSlide = slides.find((slide) => slide.id === selection.slideId)

	return (
		<div className={styles.app}>
			<ToolBar />
			<WorkSpace selectedSlide={selectedSlide} />
		</div>
	)
}

export { Editor }
