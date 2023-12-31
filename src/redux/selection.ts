import { Tabs } from '../model/types'

enum SelectionActions {
	CHANGE_SLIDE_SELECTION = 'CHANGE_SLIDE_SELECTION',
	CHANGE_OBJECT_SELECTION = 'CHANGE_OBJECT_SELECTION',
	CHANGE_KEYFRAME_SELECTION = 'CHANGE_KEYFRAME_SELECTION',
	CLEAR_OBJECT_SELECTION = 'CLEAR_OBJECT_SELECTION',
	CHANGE_TAB_SELECTION = 'CHANGE_TAB_SELECTION',
}

type ChangeSlideSelectionAction = {
	type: SelectionActions.CHANGE_SLIDE_SELECTION
	payload: string
}

type ChangeKeyframeSelectionAction = {
	type: SelectionActions.CHANGE_KEYFRAME_SELECTION
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
	| ChangeKeyframeSelectionAction

export { SelectionActions, type SelectionActionsType }
