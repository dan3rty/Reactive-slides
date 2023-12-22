import * as Type from '../types'

const WhiteColor: Type.Color = {
	hsl: '#FFFFFF',
	opacity: 0,
	percent: '100%',
}

const background: Type.Background = {
	color: {
		colors: [WhiteColor],
		rotation: 2,
	},
}

const slide: Type.Slide = {
	id: 'DHASDH7585dASD',
	background,
	objects: [],
}

const presentation: Type.Presentation = {
	title: 'Min presentation',
	slides: [slide],
}

const selection: Type.Selection = {
	selectedTab: Type.Tabs.CREATE,
	slideId: 'DHASDH7585dASD',
}

const operationHistory: Type.OperationHistory = {
	operations: [],
}

const presenter: Type.Presenter = {
	presentation,
	selection,
	operationHistory,
}

export { presenter, operationHistory, selection, presentation, slide, background }
