import * as Type from '../types'
import { HorizontalAligns, VerticalAligns } from '../types'

const BlackColor: Type.Color = {
	hsl: '#000000',
	opacity: 0.5,
	percent: '15%',
}

const WhiteColor: Type.Color = {
	hsl: '#FFFFFF',
	opacity: 0,
	percent: '30%',
}

const RedColor: Type.Color = {
	hsl: '#e52222',
	opacity: 0,
	percent: '90%',
}

const GreenColor: Type.Color = {
	hsl: '#a6ff32',
	opacity: 0,
	percent: '5%',
}

const text: Type.TextBlock = {
	blockType: Type.BlockType.TEXT,
	id: 'JGSFHL2569562',
	animation: {
		stateList: [
			{
				id: 'pororo',
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
				id: 'yomayo',
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
	value: 'WELCOME',
	fontSize: 40,
	fontFamily: Type.FontFamily.ARIAL,
	bold: true,
	italic: true,
	underline: false,
	strokethrough: false,
	color: RedColor,
	horizontalAlign: HorizontalAligns.LEFT,
	verticalAlign: VerticalAligns.TOP,
}

const text2: Type.TextBlock = {
	blockType: Type.BlockType.TEXT,
	id: 'D5DAS67F5A',
	animation: {
		stateList: [
			{
				id: 'quq',
				keyPercent: 33,
				state: {
					width: 10,
					height: 150,
					x: 200,
					y: 200,
					rotation: 0,
				},
			},
			{
				id: 'polkaq',
				keyPercent: 50,
				state: {
					width: 200,
					height: 150,
					x: 400,
					y: 200,
					rotation: -20,
				},
			},
			{
				id: 'polkaew',
				keyPercent: 60,
				state: {
					width: 200,
					height: 150,
					x: 400,
					y: 200,
					rotation: -20,
				},
			},
			{
				id: 'polkawe',
				keyPercent: 70,
				state: {
					width: 200,
					height: 150,
					x: 400,
					y: 200,
					rotation: -20,
				},
			},
			{
				id: 'jfasn',
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
		duration: 60,
	},
	baseState: {
		width: 500,
		height: 150,
		x: 1200,
		y: 200,
		rotation: 0,
	},
	value: 'craZYYYY',
	fontSize: 40,
	fontFamily: Type.FontFamily.ARIAL,
	bold: false,
	italic: true,
	underline: false,
	strokethrough: true,
	color: BlackColor,
	horizontalAlign: HorizontalAligns.RIGHT,
	verticalAlign: VerticalAligns.TOP,
}

const image: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAGsadfdssd54D6S7S',
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
	id: 'DSAG54D6Ssdhdfdhf7S',
	baseState: {
		width: 400,
		height: 400,
		x: 300,
		y: 300,
		rotation: 0,
	},
	value: 'https://greetcard.ru/uploads/posts/2022-07/1657870668_kartinka-privet-7.jpg',
	opacity: 50,
}

const image3: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54Dghfh5sdf6S7S',
	baseState: {
		width: 400,
		height: 800,
		x: 700,
		y: 200,
		rotation: 0,
	},
	value: 'https://www.jandewitenzonen.com/img/products/tulip/Katinka.jpg.webp',
	opacity: 50,
}

const image4: Type.ImageBlock = {
	typeValue: Type.ImageSource.PATH,
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6fsdfdS7S',
	baseState: {
		width: 1600,
		height: 1200,
		x: -200,
		y: 500,
		rotation: 0,
	},
	value: 'https://shutniks.com/wp-content/uploads/2020/04/smeshnye_kartinki_basseyn_45_27154905.jpg',
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
		rotation: 40,
	},
}

const background2: Type.Background = {
	color: {
		colors: [BlackColor, WhiteColor],
		rotation: 15,
	},
}

const background5: Type.Background = {
	color: {
		colors: [RedColor, GreenColor],
		rotation: 15,
	},
	image: backgroundImage,
}

const circle: Type.PrimitiveBlock = {
	blockType: Type.BlockType.PRIMITIVE,
	id: 'DASD79DAS',
	animation: {
		stateList: [
			{
				id: 'jnkz',
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
				id: 'mameq',
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
		height: 100,
		x: 200,
		y: 100,
		rotation: 0,
	},
	primitiveType: Type.Primitives.CIRCLE,
	color: {
		colors: [BlackColor],
		rotation: 0,
	},
	borderSize: 20,
	borderColor: WhiteColor,
	borderType: Type.BorderTypes.DOTTED,
}

const triangle: Type.PrimitiveBlock = {
	blockType: Type.BlockType.PRIMITIVE,
	id: 'DASD79DAS1',
	animation: {
		stateList: [
			{
				id: 'lomnao',
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
				id: 'ldka1',
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
		width: 400,
		height: 800,
		x: 700,
		y: 100,
		rotation: 0,
	},
	primitiveType: Type.Primitives.TRIANGLE,
	color: {
		colors: [GreenColor],
		rotation: 0,
	},
	borderSize: 5,
	borderColor: WhiteColor,
	borderType: Type.BorderTypes.SOLID,
}

const square: Type.PrimitiveBlock = {
	blockType: Type.BlockType.PRIMITIVE,
	id: 'PFASD79DAS',
	animation: {
		stateList: [
			{
				id: 'eqrreq',
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
				id: 'lpldqlp',
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
		height: 100,
		x: 200,
		y: 300,
		rotation: 0,
	},
	primitiveType: Type.Primitives.RECT,
	color: {
		colors: [RedColor],
		rotation: 0,
	},
	borderSize: 5,
	borderColor: WhiteColor,
	borderType: Type.BorderTypes.SOLID,
}

const slide1: Type.Slide = {
	id: 'DHASDH7585dASD',
	background: background2,
	objects: [text],
}

const slide2: Type.Slide = {
	id: 'djahDHSADGKUAGUSDAD',
	background: background5,
	objects: [image4, circle, triangle, square, text2],
}

const slide3: Type.Slide = {
	id: 'djahDHSADGsdaKUAGUSDAD',
	background: background1,
	objects: [image3, image2],
}

const presentation: Type.Presentation = {
	title: 'Max presentation',
	slides: [slide1, slide2, slide3],
}

const selection: Type.Selection = {
	selectedTab: Type.Tabs.CREATE,
	slideId: 'djahDHSADGKUAGUSDAD',
	objectsId: [],
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
	text,
}
