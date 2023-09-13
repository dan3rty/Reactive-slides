type Char = {
    value: string,
    fontSize: number,
    fontFamily: string,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    strokethrough: boolean,
    color: string,
};

type TextBlock = Array<Char>;

type CropInformation = {
    x: number,
    y: number,
    width: number,
    height: number,
};

type ImageBlock = {
    value: string,
    opacity: number,
    cropInformation: CropInformation,
};

type PrimitiveBlock = {
    type: string,
    color: string,
    borderSize: number,
    borderColor: string,
    borderType: string,
};

type ObjectBlock = {
    width: number,
    height: number,
    x: number,
    y: number,
    rotation: number,
    value: PrimitiveBlock|ImageBlock|TextBlock,
};

type BackgroundImage = {
    value: string,
    scale: number,
};

type Background = {
    color: string,
    image: BackgroundImage,
};

type Slide = {
    background: Background,
    objects: Array<ObjectBlock>,
};

type Presentation = {
    name: string,
    slides: Array<Slide>,
};

type CurrentSlide = {
    index: number,
    currentObject: number,
};

type Operation = {};

type OperationHistory = {
    operations: Array<Operation>,
    curIndex: number,
};

type App = {
    presentation: Presentation,
    currentSlide: CurrentSlide,
    operationHistory: OperationHistory,
};

export {
    App,
    OperationHistory,
    Operation,
    CurrentSlide,
    Presentation,
    Slide,
    ObjectBlock,
    PrimitiveBlock,
    TextBlock,
    Char,
    CropInformation,
    Background,
    BackgroundImage,
    ImageBlock,
};