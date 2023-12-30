enum PreviewModeActions {
	START_PREVIEW = 'START_PREVIEW',
	END_PREVIEW = 'END_PREVIEW',
}

type StartPreviewAction = {
	type: PreviewModeActions.START_PREVIEW
}

type EndPreviewAction = {
	type: PreviewModeActions.END_PREVIEW
}

type PreviewModeActionsType = StartPreviewAction | EndPreviewAction

export { PreviewModeActions, type PreviewModeActionsType }
