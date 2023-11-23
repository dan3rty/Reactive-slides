import { Editor } from './Editor/Editor'
import React, { useState } from 'react'
import { presenter } from './mockObjects'
import { Presenter } from './types'

const PresenterContext = React.createContext({
	presenter: presenter,
	setPresenter: React.Dispatch<React.SetStateAction<Presenter>>,
})

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
