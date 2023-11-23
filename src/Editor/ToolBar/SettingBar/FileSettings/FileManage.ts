import { Presentation } from '../../../../types'

function savePresentationToFile(presentation: Presentation): void {
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
}

// function loadPresentationFromFile(): Presentation {}

export { savePresentationToFile }
