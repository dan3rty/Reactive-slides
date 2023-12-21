import React from 'react'

type PresenterContextType = {
	editedSlideRef: React.MutableRefObject<HTMLDivElement>
}

const PresenterContext = React.createContext<PresenterContextType>(null)

export { PresenterContext }
