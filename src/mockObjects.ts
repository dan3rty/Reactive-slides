import * as Type from './types'

const BlackColor: Type.Color = {
	hex: '#000000',
	opacity: 0.5,
}

const WhiteColor: Type.Color = {
	hex: '#FFFFFF',
	opacity: 0,
}

const letterH: Type.Char = {
	value: 'H',
	fontSize: 12,
	fontFamily: Type.FontFamily.ARIAL,
	bold: false,
	italic: true,
	underline: false,
	strokethrough: false,
	color: BlackColor,
}

const text: Type.TextBlock = {
	blockType: Type.BlockType.TEXT,
	id: 'D5DAS67F5A',
	animation: {
		stateList: [
			{
				keyPercent: 50,
				state: {
					width: 100,
					height: 150,
					x: 200,
					y: 200,
					rotation: 0,
				},
			},
			{
				keyPercent: 100,
				state: {
					width: 300,
					height: 100,
					x: 400,
					y: 150,
					rotation: 0,
				},
			},
		],
		duration: 10,
	},
	baseState: {
		width: 100,
		height: 150,
		x: 200,
		y: 200,
		rotation: 0,
	},
	value: [letterH],
}

const image: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6S7S',
	baseState: {
		width: 100,
		height: 200,
		x: 0,
		y: 0,
		rotation: 0,
	},
	value: 'file:///',
	opacity: 50,
}

const backgroundImage: Type.BackgroundImage = {
	typeValue: Type.ImageSource.PATH,
	value: 'file:///',
	scale: 100,
}

const background1: Type.Background = {
	color: {
		colors: [WhiteColor],
	},
	image: backgroundImage,
}

const background2: Type.Background = {
	color: {
		colors: [BlackColor],
	},
}

const slide1: Type.Slide = {
	id: 'DHASDH7585dASD',
	background: background2,
	objects: [text],
}

const slide2: Type.Slide = {
	id: 'djahDHSADGKUAGUSDAD',
	background: background1,
	objects: [image],
}

const presentation: Type.Presentation = {
	title: 'Max presentation',
	slides: [slide1, slide2],
}

const selection: Type.Selection = {
	selectedTab: Type.Tabs.CREATE,
	slideId: 'DHASDH7585dASD',
	objectsId: ['D5DAS67F5A'],
}

const operationHistory: Type.OperationHistory = {
	operations: [],
	curIndex: 1,
}

const presenter: Type.Presenter = {
	presentation,
	selection,
	operationHistory,
}

export {
	presenter,
	operationHistory,
	selection,
	presentation,
	slide2,
	slide1,
	background1,
	backgroundImage,
	image,
	letterH,
}
