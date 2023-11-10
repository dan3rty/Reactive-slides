import * as Type from './types'

const BlackColor: Type.Color = {
	hex: '#000000',
	opacity: 0.5,
}

const WhiteColor: Type.Color = {
	hex: '#FFFFFF',
	opacity: 0,
}

const GrayColor: Type.Color = {
	hex: '#969992',
	opacity: 0,
}

const RedColor: Type.Color = {
	hex: '#e52222',
	opacity: 0,
}

const GreenColor: Type.Color = {
	hex: '#a6ff32',
	opacity: 0,
}

const letterH: Type.Char = {
	value: 'H',
	fontSize: 40,
	fontFamily: Type.FontFamily.ARIAL,
	bold: false,
	italic: true,
	underline: false,
	strokethrough: false,
	color: BlackColor,
}

const letterE: Type.Char = {
	value: 'E',
	fontSize: 80,
	fontFamily: Type.FontFamily.ARIAL,
	bold: false,
	italic: true,
	underline: true,
	strokethrough: false,
	color: GreenColor,
}

const letterL: Type.Char = {
	value: 'L',
	fontSize: 160,
	fontFamily: Type.FontFamily.ARIAL,
	bold: false,
	italic: false,
	underline: false,
	strokethrough: false,
	color: BlackColor,
}

const letterO: Type.Char = {
	value: 'O',
	fontSize: 160,
	fontFamily: Type.FontFamily.ARIAL,
	bold: true,
	italic: true,
	underline: true,
	strokethrough: true,
	color: RedColor,
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
					rotation: -15,
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
		rotation: -15,
	},
	value: [letterH, letterE, letterL],
}

const text2: Type.TextBlock = {
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
					rotation: -15,
				},
			},
		],
		duration: 10,
	},
	baseState: {
		width: 500,
		height: 150,
		x: 1200,
		y: 200,
		rotation: -15,
	},
	value: [
		letterH,
		letterE,
		letterL,
		letterL,
		letterO,
		letterH,
		letterE,
		letterL,
		letterL,
		letterO,
		letterH,
		letterE,
		letterL,
		letterL,
		letterO,
	],
}

const image: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6S7S',
	baseState: {
		width: 400,
		height: 800,
		x: 700,
		y: 200,
		rotation: 45,
	},
	value: 'https://www.jandewitenzonen.com/img/products/tulip/Katinka.jpg.webp',
	opacity: 50,
}

const image2: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6S7S',
	baseState: {
		width: 400,
		height: 400,
		x: 300,
		y: 300,
		rotation: -20,
	},
	value: 'https://greetcard.ru/uploads/posts/2022-07/1657870668_kartinka-privet-7.jpg',
	opacity: 50,
}

const image3: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6S7S',
	baseState: {
		width: 400,
		height: 800,
		x: 700,
		y: 200,
		rotation: 15,
	},
	value: 'https://www.jandewitenzonen.com/img/products/tulip/Katinka.jpg.webp',
	opacity: 50,
}

const backgroundImage: Type.BackgroundImage = {
	typeValue: Type.ImageSource.PATH,
	value: 'https://w.forfun.com/fetch/e2/e2092a2bba26bc1aad412fadc70188ea.jpeg',
	scale: 100,
}

const background1: Type.Background = {
	color: {
		colors: [WhiteColor, RedColor, GreenColor, RedColor, WhiteColor, GreenColor, RedColor],
	},
}

const background2: Type.Background = {
	color: {
		colors: [BlackColor, WhiteColor],
	},
}

const background5: Type.Background = {
	color: {
		colors: [RedColor, GreenColor],
	},
	image: backgroundImage,
}

const background4: Type.Background = {
	color: {
		colors: [GreenColor, GrayColor],
	},
}

const slide1: Type.Slide = {
	id: 'DHASDH7585dASD',
	background: background2,
	objects: [text, image],
}

const slide2: Type.Slide = {
	id: 'djahDHSADGKUAGUSDAD',
	background: background5,
	objects: [image3, image2, text2],
}

const slide3: Type.Slide = {
	id: 'djahDHSADGsdaKUAGUSDAD',
	background: background1,
	objects: [image3, image2],
}

const slide4: Type.Slide = {
	id: 'djasdfgfdgADGKUAGUSDAD',
	background: background4,
	objects: [image3, image2],
}

const slide5: Type.Slide = {
	id: 'djjgfkUSDAD',
	background: background1,
	objects: [image3, image2],
}

const slide6: Type.Slide = {
	id: 'djahDHSsfdUSDAD',
	background: background1,
	objects: [image3, image2],
}

const presentation: Type.Presentation = {
	title: 'Max presentation',
	slides: [slide1, slide2, slide3, slide4, slide5, slide6],
}

const selection: Type.Selection = {
	selectedTab: Type.Tabs.ANIMATION,
	slideId: 'djahDHSADGKUAGUSDAD',
	objectsId: ['DSAG54D6S7S'],
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
	image2,
	letterH,
	text,
}
