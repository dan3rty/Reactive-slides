enum HistoryActions {
	UNDO = 'UNDO',
	REDO = 'REDO',
}

type UndoAction = {
	type: HistoryActions.UNDO
}

type RedoAction = {
	type: HistoryActions.REDO
}

type HistoryActionsType = UndoAction | RedoAction

export { HistoryActions, type HistoryActionsType }
