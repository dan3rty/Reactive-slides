import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React from 'react'
import styles from './TopBar.css'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

type TopBarProps = {
	slideRefList: React.MutableRefObject<HTMLDivElement[]>
}

function TopBar({ slideRefList }: TopBarProps) {
	const title = useAppSelector((state) => state).presentation.title
	const { createChangeTitleAction, createStartPreviewAction } = useAppActions()
	function convertToPdf() {
		const pdf = new jsPDF('l', 'mm', [1068, 600], true)
		let pagesCounter = 1
		const promises = slideRefList.current.map(async (slideRef) => {
			const canvas = await html2canvas(slideRef, {
				onclone: ({}, clone) => {
					clone.style.width = 1068 + 'px' //просто растягивание
					clone.style.height = 600 + 'px'
				},
			})
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = pdf.internal.pageSize.getHeight()
			const imageData = canvas.toDataURL()
			const imageWidth = canvas.width
			const imageHeight = canvas.height
			const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
			pdf.addImage(imageData, 'PNG', 0, 0, imageWidth * ratio, imageHeight * ratio)
			pdf.addPage()
			pagesCounter++
		})
		Promise.all(promises).then(() => {
			pdf.deletePage(pagesCounter)
			pdf.save('presentation.pdf')
		})
	}
	return (
		<div className={styles.topBar}>
			<div className={styles.leftGroup}>
				<span className={styles.logo}>Reactive slides</span>
				<span
					className={styles.run}
					onClick={() => document.body.requestFullscreen().then(createStartPreviewAction)}
				>
					Run!
				</span>
				<span className={styles.run} onClick={convertToPdf}>
					Export!
				</span>
			</div>
			<textarea
				value={title}
				className={styles.presentationName}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					createChangeTitleAction(e.target.value)
				}
				maxLength={30}
			>
				{title}
			</textarea>
		</div>
	)
}

export { TopBar }
