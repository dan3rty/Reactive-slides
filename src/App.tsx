import { Editor } from './Editor/Editor'
import React, { useState } from 'react'
import { presenter } from './mockObjects'

const PresenterContext = React.createContext(null)

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
