import { Editor } from './Editor/Editor'
import React from 'react'
import { presenter } from './mockObjects'

const presentation = React.createContext(presenter)
function App() {
	return (
		<presentation.Provider value={presenter}>
			<Editor />
		</presentation.Provider>
	)
}
export default App
export { presentation }
