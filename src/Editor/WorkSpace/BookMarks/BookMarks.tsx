import styles from './BookMarks.module.css'
import { BookMark } from './BookMark/BookMark'

import { ArrowIcon, MoveIcon, SelectIcon } from '../../../common/Icons/icons'
import { useContext, useState } from 'react'
import { Selection, Tabs } from '../../../types'
import { PresenterContext } from '../../../presenterContext/PresenterContext'

function BookMarks() {
	const [chosen, setChosen] = useState(Tabs.EDIT)
	const { presenter, setPresenter } = useContext(PresenterContext)
	const { presentation, selection, operationHistory } = presenter
	const isAvailable = selection.objectsId.length == 1

	if (!isAvailable && chosen != Tabs.CREATE) {
		setChosen(Tabs.CREATE)
		const newSelection: Selection = {
			...selection,
			selectedTab: Tabs.CREATE,
		}
		setPresenter({ presentation, selection: newSelection, operationHistory })
	}

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
				isAvailable={true}
			></BookMark>
			<BookMark
				text='edit'
				icon={SelectIcon}
				isChosen={chosen == Tabs.EDIT}
				onClick={isAvailable ? createOnClick(Tabs.EDIT) : () => {}}
				isAvailable={isAvailable}
			></BookMark>
			<BookMark
				text='animation'
				icon={MoveIcon}
				isChosen={chosen == Tabs.ANIMATION}
				onClick={isAvailable ? createOnClick(Tabs.ANIMATION) : () => {}}
				isAvailable={isAvailable}
			></BookMark>
		</div>
	)
}

export { BookMarks }
