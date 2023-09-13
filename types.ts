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

type TextBlock = CommonBlock & Array<Char>;

type CropInformation = {
    x: number,
    y: number,
    width: number,
    height: number,
};

type CommonBlock = {
    id: number,
    width: number,
    height: number,
    x: number,
    y: number,
    rotation: number,
};

type ImageBlock = CommonBlock & {
    value: string,
    opacity: number,
    cropInformation?: CropInformation,
};

type PrimitiveBlock = CommonBlock & {
    type: Primitives,
    color: string,
    borderSize: number,
    borderColor: string,
    borderType: string,
};

type ObjectBlock = {
    value: PrimitiveBlock|ImageBlock|TextBlock,
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
    objects: Array<ObjectBlock>,
};

type Presentation = {
    name: string,
    slides: Array<Slide>,
};

type Selection = {
    slideId: number,
    objectId?: number,
};

type Operation = {};

type OperationHistory = {
    operataions: Array<Operation>,
    curIndex: number,
};

type App = {
    presentation: Presentation,
    selection: Selection,
    operationHistory: OperationHistory,
};

enum Primitives {
    CIRCLE = 'Circle',
    RECT = 'Rectangle',
    TRIANGLE = 'Triangle',
}

export {
    App,
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
};