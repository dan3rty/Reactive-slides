import * as Type from './types'

const BlackColor: Type.Color = {
    hex: "#000000",
    opacity: 0,
}

const WhiteColor: Type.Color = {
    hex: "#FFFFFF",
    opacity: 0,
}

const BlueColor: Type.Color = {
    hex: "#0000FF",
    opacity: 0,
}

const RedColor: Type.Color = {
    hex: "#FF0000",
    opacity: 0,
}

const letterH: Type.Char = {
    value: 'H',
    fontSize: 12,
    fontFamily: Type.FontFamily.ARIAL,
    bold: false,
    italic: false,
    underline: false,
    strokethrough: false,
    color: BlackColor,
}

const letterE: Type.Char = {
    value: 'E',
    fontSize: 15,
    fontFamily: Type.FontFamily.ARIAL,
    bold: true,
    italic: true,
    underline: true,
    strokethrough: true,
    color: BlackColor,
}

const text: Type.TextBlock = {
    blockType: Type.BlockType.TEXT,
    id: "D5DAS67F5A",
    stateList: [
        {
            keyPercent: 0,
            state: {
                width: 100,
                height: 150,
                x: 200,
                y: 200,
                rotation: 0,
            }
        },
        {
            keyPercent: 100,
            state: {
                width: 300,
                height: 100,
                x: 400,
                y: 150,
                rotation: 0,
            }
        },
    ],
    baseState: {
        width: 100,
        height: 150,
        x: 200,
        y: 200,
        rotation: 0,
    },
    duration: 100,
    value: [letterH, letterE],
}

const image: Type.ImageBlock = {
    typeValue: Type.ImageSource.PATH,
    blockType: Type.BlockType.IMAGE,
    id: "DSAG54D6S7S",
    stateList: [
        {
            keyPercent: 0,
            state: {
                width: 100,
                height: 200,
                x: 0,
                y: 0,
                rotation: 0,
            }
        }
    ],
    baseState: {
        width: 100,
        height: 200,
        x: 0,
        y: 0,
        rotation: 0,
    },
    duration: 10,
    value: "file:///",
    opacity: 50,
}

const circle: Type.PrimitiveBlock = {
    blockType: Type.BlockType.PRIMITIVE,
    id: "DASD79DAS",
    stateList: [
        {
            keyPercent: 0,
            state: {
                width: 300,
                height: 300,
                x: 500,
                y: 400,
                rotation: 0,
            }
        }
    ],
    baseState: {
        width: 300,
        height: 300,
        x: 500,
        y: 400,
        rotation: 0,
    },
    duration: 55,
    primitiveType: Type.Primitives.CIRCLE,
    color: {
        colors: [BlackColor],
    },
    borderSize: 20,
    borderColor: BlackColor,
    borderType: Type.BorderTypes.DOTTED,
}

const triangle: Type.PrimitiveBlock = {
    blockType: Type.BlockType.PRIMITIVE,
    id: "DASD79DAS",
    stateList: [
        {
            keyPercent: 0,
            state: {
                width: 300,
                height: 300,
                x: 500,
                y: 400,
                rotation: 0,
            }
        }
    ],
    baseState: {
        width: 300,
        height: 300,
        x: 500,
        y: 400,
        rotation: 0,
    },
    duration: 55,
    primitiveType: Type.Primitives.TRIANGLE,
    color: {
        colors: [BlackColor],
    },
    borderSize: 5,
    borderColor: WhiteColor,
    borderType: Type.BorderTypes.SOLID,
}

const backgroundImage: Type.BackgroundImage = {
    typeValue: Type.ImageSource.PATH,
    value: "file:///",
    scale: 100,
}

const background1: Type.Background = {
    color: {
        colors: [WhiteColor],
    },
    image: backgroundImage
}

const background2: Type.Background = {
    color: {
        colors: [WhiteColor, BlueColor, RedColor],
    }
}

const slide1: Type.Slide = {
    id: "DHASDH7585dASD",
    background: background1,
    objects: [text, circle],
}

const slide2: Type.Slide = {
    id: "djahDHSADGKUAGUSDAD",
    background: background2,
    objects: [image],
}

const slide3: Type.Slide = {
    id: "OPOPCHIDAOP",
    background: background2,
    objects: [triangle],
}
const presentation: Type.Presentation = {
    title: "Max presentation",
    slides: [slide1, slide2, slide3],
}

const selection: Type.Selection = {
    slideId: "DHASDH7585dASD",
    objectsId: ["D5DAS67F5A", "DASD79DAS"],
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
    background2,
    backgroundImage,
    circle,
    image,
    text,
    letterE,
    letterH,
}