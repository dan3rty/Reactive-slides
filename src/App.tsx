import { Editor } from './Editor/Editor'
import {useRef, useState} from 'react'
import { presenter } from './mock/mockObjects'
import { PresenterContext } from './presenterContext/PresenterContext'

function App() {
	const [presenterObj, setPresenter] = useState(presenter)

	return (
		<PresenterContext.Provider
			value={{
				presenter: presenterObj,
				setPresenter,
				editedSlideRef: useRef(null),
			}}
		>
			<Editor />
		</PresenterContext.Provider>
	)
}
export default App
export { PresenterContext }
