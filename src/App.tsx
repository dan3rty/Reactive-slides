import { Editor } from './Editor/Editor'
import { useEffect } from 'react'
import { useAppActions, useAppSelector } from './redux/hooks'

function App() {
	const slides = useAppSelector((state) => state.slides)
	const { createChangeSlideSelectionAction } = useAppActions()
	useEffect(() => {
		createChangeSlideSelectionAction(slides[0].id)
	}, [])

	return <Editor />
}
export default App
