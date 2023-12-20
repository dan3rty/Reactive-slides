import { Tabs } from '../types'

enum SelectionActions {
	CHANGE_SLIDE_SELECTION = 'CHANGE_SLIDE_SELECTION',
	ADD_OBJECT_SELECTION = 'ADD_OBJECT_SELECTION',
	CLEAR_OBJECTS_SELECTION = 'CLEAR_OBJECTS_SELECTION',
	CHANGE_TAB_SELECTION = 'CHANGE_TAB_SELECTION',
}

type ChangeSlideSelectionAction = {
	type: SelectionActions.CHANGE_SLIDE_SELECTION
	payload: string
}

type AddObjectSelectionAction = {
	type: SelectionActions.ADD_OBJECT_SELECTION
	payload: string
}

type ClearObjectSelectionAction = {
	type: SelectionActions.CLEAR_OBJECTS_SELECTION
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
