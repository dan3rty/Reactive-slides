import styles from './BookMarks.css'
import { BookMark } from './BookMark/BookMark'
import { ArrowIcon, MoveIcon, SelectIcon } from '../../../common/Icons/icons'
import { Tabs } from '../../../types'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

function BookMarks() {
	const { createChangeTabSelectionAction } = useAppActions()
	const selection = useAppSelector((state) => state.selection)
	const isAvailable = !!selection.objectId

	if (!isAvailable && selection.selectedTab != Tabs.CREATE) {
		createChangeTabSelectionAction(Tabs.CREATE)
	}

	const createOnClick = (tab: Tabs) => {
		//TODO: убрать
		return () => {
			createChangeTabSelectionAction(tab)
		}
	}
	return (
		<div className={styles.BookMarks}>
			<BookMark
				text='create'
				icon={ArrowIcon}
				isChosen={selection.selectedTab == Tabs.CREATE}
				onClick={createOnClick(Tabs.CREATE)}
				isAvailable={true}
			></BookMark>
			<BookMark
				text='edit'
				icon={SelectIcon}
				isChosen={selection.selectedTab == Tabs.EDIT}
				onClick={isAvailable ? createOnClick(Tabs.EDIT) : () => {}}
				isAvailable={isAvailable}
			></BookMark>
			<BookMark
				text='animation'
				icon={MoveIcon}
				isChosen={selection.selectedTab == Tabs.ANIMATION}
				onClick={isAvailable ? createOnClick(Tabs.ANIMATION) : () => {}}
				isAvailable={isAvailable}
			></BookMark>
		</div>
	)
}

export { BookMarks }
