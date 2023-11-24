import React, {useContext} from 'react'
import styles from '../common/Styles/App.module.css'
import { ToolBar } from './ToolBar/ToolBar'
import { WorkSpace } from './WorkSpace/WorkSpace'
import {PresenterContext} from "../App";

function Editor() {
	const context = useContext(PresenterContext).presenter
	const selectedSlide = context.presentation.slides.find(
		(slide) => slide.id === context.selection.slideId,
	)
	return selectedSlide ? (
		<div className={styles.App}>
			<ToolBar />
			<WorkSpace selectedSlide={selectedSlide}/>
		</div>
	) : (
		<div></div>
	)
}

export { Editor }
