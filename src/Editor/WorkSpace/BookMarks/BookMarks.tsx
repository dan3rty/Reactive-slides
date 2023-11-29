import styles from './BookMarks.module.css'
import { BookMark } from './BookMark/BookMark'

import { ArrowIcon, MoveIcon, SelectIcon } from '../../../common/Icons/icons'
import { useContext, useState } from 'react'
import { Selection, Tabs } from '../../../types'
import { PresenterContext } from '../../../presenterContext/PresenterContext'

function BookMarks() {
	const [chosen, setChosen] = useState(Tabs.CREATE)
	const { presenter, setPresenter } = useContext(PresenterContext)
	const { presentation, selection, operationHistory } = presenter

	const createOnClick = (tab: Tabs) => {
		return () => {
			setChosen(tab)
			const newSelection: Selection = {
				...selection,
				selectedTab: tab,
			}
			setPresenter({ presentation, selection: newSelection, operationHistory })
		}
	}
	return (
		<div className={styles.BookMarks}>
			<BookMark
				text='create'
				icon={ArrowIcon}
				isChosen={chosen == Tabs.CREATE}
				onClick={createOnClick(Tabs.CREATE)}
			></BookMark>
			<BookMark
				text='edit'
				icon={SelectIcon}
				isChosen={chosen == Tabs.EDIT}
				onClick={createOnClick(Tabs.EDIT)}
			></BookMark>
			<BookMark
				text='animation'
				icon={MoveIcon}
				isChosen={chosen == Tabs.ANIMATION}
				onClick={createOnClick(Tabs.ANIMATION)}
			></BookMark>
		</div>
	)
}

export { BookMarks }
