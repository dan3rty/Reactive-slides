import { Editor } from './Editor/Editor'
import { useState } from 'react'
import { presenter } from './mock/mockObjects'
import { PresenterContext } from './presenterContext/PresenterContext'

function App() {
	const [presenterObj, setPresenter] = useState(presenter)

	return (
		<PresenterContext.Provider
			value={{
				presenter: presenterObj,
				setPresenter,
			}}
		>
			<Editor />
		</PresenterContext.Provider>
	)
}
export default App
export { PresenterContext }
