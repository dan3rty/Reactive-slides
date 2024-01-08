import { Presentation, Tabs } from '../model/types'
import { ChangeEvent, useCallback } from 'react'
import { useAppActions, useAppSelector } from '../redux/hooks'

function useSavePresentationToFile(): () => void {
	const presenter = useAppSelector((state) => state)
	const title = presenter.presentation.title
	const slides = presenter.presentation.slides
	const presentation = { title, slides }
	return useCallback(() => {
		const content = JSON.stringify(presentation)
		const name = `${presentation.title}.json`
		const type = 'text/plain'

		const a = document.createElement('a')
		const file = new Blob([content], { type: type })
		a.href = URL.createObjectURL(file)
		a.download = name
		document.body.appendChild(a)
		a.click()
		a.remove()
	}, [presentation])
}

function useLoadPresentation(): (event: ChangeEvent<HTMLInputElement>) => void {
	const {
		createChangeTitleAction,
		createSetSlidesAction,
		createChangeTabSelectionAction,
		createChangeSlideSelectionAction,
	} = useAppActions()
	return useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()
		const file = (event.target as HTMLInputElement).files[0]
		if (file) {
			reader.readAsText(file)
		}
		reader.onload = () => {
			try {
				if (file.name.split('.').pop() != 'json') {
					throw Error('Неправильное расширение у файла')
				}
				const text = reader.result as string
				const presentation: Presentation = JSON.parse(text)
				createChangeTabSelectionAction(Tabs.CREATE)
				createChangeSlideSelectionAction(presentation.slides[1].id)
				createSetSlidesAction(presentation.slides)
				createChangeTitleAction(presentation.title)
			} catch (e) {
				alert('Ошибка валидации')
			}
		}
	}, [])
}

export { useLoadPresentation, useSavePresentationToFile }
