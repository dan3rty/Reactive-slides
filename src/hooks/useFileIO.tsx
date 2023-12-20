import { OperationHistory, Presentation, Selection, Tabs } from '../types'
import { ChangeEvent, useCallback, useContext } from 'react'
import { PresenterContext } from '../App'
import { useAppSelector } from '../redux/hooks'

function useSavePresentationToFile(): () => void {
	const title = useAppSelector((state) => state.title)
	const slides = useAppSelector((state) => state.slides)
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
	const { setPresenter } = useContext(PresenterContext)
	return useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const reader = new FileReader()
			const file = (event.target as HTMLInputElement).files[0]
			reader.readAsText(file)
			reader.onload = () => {
				try {
					if (file.name.split('.').pop() != 'json') {
						throw Error('Неправильное расширение у файла')
					}
					const text = reader.result as string
					const presentation: Presentation = JSON.parse(text)
					const selection: Selection = {
						selectedTab: Tabs.CREATE,
						slideId: presentation.slides[1].id,
					}
					const operationHistory: OperationHistory = {
						operations: [],
					}
					setPresenter({ presentation, selection, operationHistory })
				} catch (e) {
					alert('Ошибка валидации')
				}
			}
		},
		[setPresenter],
	)
}

export { useLoadPresentation, useSavePresentationToFile }
