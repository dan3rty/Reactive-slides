import * as Type from './types';

const letterH: Type.Char = {
    value: 'H',
    fontSize: 12,
    fontFamily: 'Arial',
    bold: false,
    italic: false,
    underline: false,
    strokethrough: false,
    color: '#FFFFFF',
};

const letterE: Type.Char = {
    value: 'E',
    fontSize: 15,
    fontFamily: 'Arial',
    bold: true,
    italic: true,
    underline: true,
    strokethrough: true,
    color: '#FFFFF2',
};

const text: Type.TextBlock = {
    id: 1,
    width: 100,
    height: 150,
    x: 200,
    y: 200,
    rotation: 0,
    value: [letterH, letterE],
};

const crop: Type.CropInformation = {
    x: 15,
    y: 20,
    width: 100,
    height: 2000,
}

const image: Type.ImageBlock = {
    id: 2,
    width: 100,
    height: 200,
    x: 0,
    y: 0,
    rotation: 0,
    value: "file:///",
    opacity: 50,
    cropInformation: crop,
}

const circle: Type.PrimitiveBlock = {
    id: 3,
    width: 300,
    height: 300,
    x: 500,
    y: 400,
    rotation: 0,
    type: Type.Primitives.CIRCLE,
    color: '#00000E',
    borderSize: 0,
    borderColor: '#00000E',
    borderType: "",
}

const backgroundImage: Type.BackgroundImage = {
    value: "file:///",
    scale: 100,
}

const background: Type.Background = {
    color: '#000000',
    image: backgroundImage,
}

const slide1: Type.Slide = {
    id: 1,
    background: background,
    objects: [text, circle],
}

const slide2: Type.Slide = {
    id: 2,
    background: background,
    objects: [image],
}

const presentation: Type.Presentation = {
    title: "My first presentation",
    slides: [slide1, slide2],
}

const selection: Type.Selection = {
    slideId: 1,
    objectId: 3,
}

const operationHistory: Type.OperationHistory = {
    operations: [],
}

const presenter: Type.Presenter = {
    presentation: presentation,
    selection: selection,
    operationHistory: operationHistory,
}

export {
    presenter,
    operationHistory,
    selection,
    presentation,
    slide2,
    slide1,
    background,
    backgroundImage,
    circle,
    image,
    crop,
    text,
    letterE,
    letterH,
}