import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useRef } from 'react'
import styles from './TopBar.css'
import { useAppActions, useAppSelector } from '../../../redux/hooks'
import { getSlideSize } from '../../../common/Tools/getSlideSize'
import { PlayerSlideRenderer } from '../../../common/Player/PlayerSlideRenderer'

function TopBar() {
	const title = useAppSelector((state) => state).presentation.title
	const slides = useAppSelector((state) => state).presentation.slides

	const refs = useRef<HTMLDivElement[]>([])

	const { createChangeTitleAction, createStartPreviewAction } = useAppActions()
	const { width, height } = getSlideSize()
	function convertToPdf() {
		const pdf = new jsPDF('l', 'mm', [width, height], true)
		let pagesCounter = 1
		const promises = refs.current.map(async (slideRef) => {
			slideRef.style.display = 'block'
			const canvas = await html2canvas(slideRef, {
				// eslint-disable-next-line no-empty-pattern
				onclone: ({}, clone) => {
					clone.style.width = width + 'px' //просто растягивание
					clone.style.height = height + 'px'
				},
			})
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = pdf.internal.pageSize.getHeight()
			const image = document.createElement('img')
			const imageLoadPromise = new Promise((resolve) => {
				image.onload = resolve
			})
			image.src = canvas.toDataURL()

			await imageLoadPromise

			// Обработчик события onload
			const imageWidth = image.width
			const imageHeight = image.height
			const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight)
			pdf.addImage(image, 'PNG', 0, 0, imageWidth * ratio, imageHeight * ratio)
			pdf.addPage()
			slideRef.style.display = 'none'
			pagesCounter++
		})
		Promise.all(promises).then(() => {
			pdf.deletePage(pagesCounter)
			pdf.save('presentation.pdf')
		})
	}

	const slideList = slides.map((slide, index) => {
		return (
			<PlayerSlideRenderer
				key={index}
				isHidden={true}
				ref={(el) => (refs.current[index] = el)}
				slide={slide}
			/>
		)
	})

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
			{slideList}
		</div>
	)
}

export { TopBar }
