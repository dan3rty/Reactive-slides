import React from 'react'
import { Presenter } from '../types'

type PresenterContextType = {
	presenter: Presenter
	setPresenter: React.Dispatch<React.SetStateAction<Presenter>>
	editedSlideRef: React.MutableRefObject<HTMLDivElement>
}

const PresenterContext = React.createContext<PresenterContextType>(null)

export { PresenterContext }
