import { Editor } from './Editor/Editor'
import { useRef } from 'react'
import { PresenterContext } from './presenterContext/PresenterContext'

function App() {
	return (
		<PresenterContext.Provider
			value={{
				editedSlideRef: useRef(null),
			}}
		>
			<Editor />
		</PresenterContext.Provider>
	)
}
export default App
export { PresenterContext }
