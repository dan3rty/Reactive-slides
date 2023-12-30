import { Editor } from './Editor/Editor'
import { useEffect } from 'react'
import { useAppActions, useAppSelector } from './redux/hooks'
import { Player } from './Player/Player'

function App() {
	const slides = useAppSelector((state) => state.slides)
	const previewMode = useAppSelector((state) => state.previewMode)
	const { createChangeSlideSelectionAction } = useAppActions()
	useEffect(() => {
		createChangeSlideSelectionAction(slides[0].id)
	}, [])
	if (previewMode) {
		return <Player />
	} else {
		return <Editor />
	}
}
export default App
