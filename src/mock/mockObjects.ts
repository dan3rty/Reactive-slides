import * as Type from '../model/types'
import { HorizontalAligns, VerticalAligns } from '../model/types'

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
		duration: 1,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 87,
				state: {
					width: 100,
					height: 150,
					x: 500,
					y: 500,
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
					y: 550,
					rotation: 0,
				},
			},
		],
		looped: true,
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
		duration: 5,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 16,
				state: {
					width: 999,
					height: 150,
					x: 450,
					y: 345,
					rotation: 0,
				},
			},
			{
				id: 'mameq',
				keyPercent: 100,
				state: {
					width: 50,
					height: 100,
					x: 900,
					y: 150,
					rotation: 0,
				},
			},
		],
		looped: true,
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
	blockType: Type.BlockType.IMAGE,
	id: 'DSAGsadfdssd54D6S7S',
	animation: {
		duration: 2,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 57,
				state: {
					width: 800,
					height: 150,
					x: 90,
					y: 1000,
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
					y: 400,
					rotation: 0,
				},
			},
		],
		looped: false,
	},
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
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6Ssdhdfdhf7S',
	animation: {
		duration: 10,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 90,
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
					y: 900,
					rotation: 0,
				},
			},
		],
		looped: true,
	},
	baseState: {
		width: 400,
		height: 400,
		x: 300,
		y: 300,
		rotation: 0,
	},
	value: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBXgFeAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCAAtADIDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABQYAAwcE/8QANRAAAQMDBAAEAgcJAQAAAAAAAQIDBAAFEQYSITETQVFhB5EUIjJCcYGTFSMkQ5KhscHh8P/EABoBAAIDAQEAAAAAAAAAAAAAAAEDAAIEBgX/xAAjEQACAgICAAcBAAAAAAAAAAABAgARAxIhQRMxQmGRobHh/9oADAMBAAIRAxEAPwDVvpIVkA98ZoTfJ0qLAkrg+Et9KSUodztXj7uR1n1qt2b9VI34x71yJDtxf8JpsukArUnk8Dk9fKubJoXOoAgG365u06MXzo+5BTam8K8doNuJyOEFRB9PKrpnxRdtj2bzpq8QEpV9RSS282rg9rScDk+dKrvxO1RLktCJHgwUOOhtDbkYLQsYPKVk5UOCCeCCOqZdC66ifEJDlpudsBcW0pfi+Aptp9AA3EBXI7z/AL8qq/iouzKK9iYFbGxqyPj8/sYtL6gb1BDj31dtZhvLUsR1rCVuBsKISrdjIzgnApgavMx3c6Zr25xXYWeR0P7Ul6blMOWdliMplTEXfHQpr7JQhRSMfkBRZU4FGAAMde9MDnqQoO+YZW6VqUpWFKUckkAkmpQX6a4PI1KlmTWL8i6Y4HXrTH8NiZs64grKXPDSUkdgbvX5UkvuYHO0+wpWu+pbhBubUa03SZbnMEPuxV7HAk4ITn3oNiLgqJV2oRv1/wDD63N6qitKULTAlLcclqQ04UkZKh4ahkAqJKT1jvmm3RukYGjbbd9RvNTXHywpwypigVONJTv+r5gZHng8DikWHdr6/E2s6y1Kzcinc0yqWlwOgeY3JIPPzz61fcb5riXY1wZ+qm5kG4I8OQzPhNofS398IWjHOODkHulursuhI++ZXV+KEU/hhq1a1GHNcCFTlOSWgeipSyopHpwevY1o7V3ERbqQnepacAnyrF9VqYt7YcigRnI6g4hXCVJI+zgeQ9vTutDtUpV1gRZoUAXWkrIJx2K1uvqEGNqJQw7+2Jw4DyAB5bRUrhDro/lt/qf8qUuoy4HvF4TZICHvBU4p1RSn8QCfz6pIOtE3SG9HY2IkvKSplQb5UrIIGOyc+YwKPfEK1QLdapd1bj+M5EdLLTcgh1AB9lA1mmiLs8rVzNykpRIfKsAlIATkYBAHAwOq2DAACx6mNs53CDuazdpThajeIZCpXRc4JSSfsJPfJ7GfarYD9pvziY2Z0Z7fuSN25AUk8bVngJz2k8/jTHbYkC9Wp91+GgphSkshKiFbiACFZwMcq9K7EWKHMWy022GfpW8OKI3cJPl13WNBrwZ6TLseO5meqtBPIvYba2yBIbUpTgG8ICTyrb3nJA9P8Fh0o0EWdpoLUhLRU0NiQU8KP/sUfvTDMSMlwN70RnTHCFHlQKM5z5EcUt6dkSbsieVSFNFqQpJwM7uAOflTgxK1M74xjfy5hglQJ/eq/RNSucwn8n+LV/QKlChBZn//2Q==',
	opacity: 50,
}

const image3: Type.ImageBlock = {
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54Dghfh5sdf6S7S',
	animation: {
		duration: 7,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 10,
				state: {
					width: 100,
					height: 150,
					x: 800,
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
		looped: false,
	},
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
	blockType: Type.BlockType.IMAGE,
	id: 'DSAG54D6fsdfdS7S',
	animation: {
		duration: 4,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 79,
				state: {
					width: 100,
					height: 150,
					x: 600,
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
		looped: false,
	},
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
		duration: 2,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 30,
				state: {
					width: 100,
					height: 150,
					x: 200,
					y: 200,
					rotation: 0,
				},
			},
			{
				id: 'fdfg',
				keyPercent: 50,
				state: {
					width: 300,
					height: 100,
					x: 1000,
					y: 150,
					rotation: 0,
				},
			},
			{
				id: 'mameq',
				keyPercent: 100,
				state: {
					width: 0,
					height: 500,
					x: 400,
					y: 800,
					rotation: 0,
				},
			},
		],
		looped: true,
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
		duration: 1,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 40,
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
		looped: true,
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
		duration: 2,
		stateList: [
			{
				id: 'jnkz',
				keyPercent: 15,
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
		looped: false,
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
}

const presenter: Type.Presenter = {
	previewMode: false,
	presentation,
	selection,
}

export {
	presenter,
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
