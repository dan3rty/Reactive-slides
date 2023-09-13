type ObjectBlock = {
    id: number,
    width: number,
    height: number,
    x: number,
    y: number,
    rotation: number,
};

enum fontFamily {
    ARIAL = 'Arial',
    TIMES_NEW_ROMAN = 'Times New Roman',
}

type Char = {
    value: string,
    fontSize: number,
    fontFamily: fontFamily,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    strokethrough: boolean,
    color: string,
};

type TextBlock = ObjectBlock & Array<Char>;

type CropInformation = {
    x: number,
    y: number,
    width: number,
    height: number,
};

type ImageBlock = ObjectBlock & {
    value: string,
    opacity: number,
    cropInformation?: CropInformation,
};

enum Primitives {
    CIRCLE = 'Circle',
    RECT = 'Rectangle',
    TRIANGLE = 'Triangle',
}

type PrimitiveBlock = ObjectBlock & {
    type: Primitives,
    color: string,
    borderSize: number,
    borderColor: string,
    borderType: string,
};

type BackgroundImage = {
    value: string,
    scale: number,
};

type Background = {
    color: string,
    image?: BackgroundImage,
};

type Slide = {
    id: number,
    background: Background,
    objects: Array<TextBlock | PrimitiveBlock | ImageBlock>,
};

type Presentation = {
    title: string,
    slides: Array<Slide>,
};

type Selection = {
    slideId: number,
    objectId?: number,
};

type Operation = {};

type OperationHistory = {
    operations: Array<Operation>,
    curIndex?: number,
};

type Presenter = {
    presentation: Presentation,
    selection: Selection,
    operationHistory: OperationHistory,
};

export {
    Presenter,
    OperationHistory,
    Operation,
    Selection,
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
    Primitives,
    fontFamily
};