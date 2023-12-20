enum TitleActions {
	CHANGE_TITLE = 'CHANGE_TITLE',
}

type ChangeTitleAction = {
	type: TitleActions.CHANGE_TITLE
	payload: string
}

type TitleActionsType = ChangeTitleAction

export { TitleActions, type TitleActionsType }
