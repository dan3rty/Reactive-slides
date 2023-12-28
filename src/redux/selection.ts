import { Tabs } from '../types'

enum SelectionActions {
	CHANGE_SLIDE_SELECTION = 'CHANGE_SLIDE_SELECTION',
	CHANGE_OBJECT_SELECTION = 'CHANGE_OBJECT_SELECTION',
	CLEAR_OBJECT_SELECTION = 'CLEAR_OBJECT_SELECTION',
	CHANGE_TAB_SELECTION = 'CHANGE_TAB_SELECTION',
}

type ChangeSlideSelectionAction = {
	type: SelectionActions.CHANGE_SLIDE_SELECTION
	payload: string
}

type AddObjectSelectionAction = {
	type: SelectionActions.CHANGE_OBJECT_SELECTION
	payload: string
}

type ClearObjectSelectionAction = {
	type: SelectionActions.CLEAR_OBJECT_SELECTION
}

type ChangeTabSelectionAction = {
	type: SelectionActions.CHANGE_TAB_SELECTION
	payload: Tabs
}

type SelectionActionsType =
	| ChangeSlideSelectionAction
	| AddObjectSelectionAction
	| ClearObjectSelectionAction
	| ChangeTabSelectionAction

export { SelectionActions, type SelectionActionsType }
