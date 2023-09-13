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

const text: Type.TextBlock = [letterH, letterE];

const crop: Type.CropInformation = {
    x: 15,
    y: 20,
    width: 100,
    height: 2000,
}

const image: Type.ImageBlock = {
    value: "file://",
    opacity: 50,
    cropInformation: crop,
}

const circle: Type.PrimitiveBlock = {
    type: Type.CIRCLE_TYPE,
    color: '#00000E',
    borderSize:
}

