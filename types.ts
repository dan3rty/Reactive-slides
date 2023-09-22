type ObjectBlock = {
    id: number,
    width: number,
    height: number,
    x: number,
    y: number,
    rotation: number,
};

enum BlockType {
    IMAGE = 'image',
    TEXT = 'text',
    PRIMITIVE = 'primitive',
}

enum FontFamily {
    ARIAL = 'Arial',
    TIMES_NEW_ROMAN = 'Times New Roman',
}

type Color = {
    value: string,
    opacity?: number,
};

type Char = {
    value: string,
    fontSize: number,
    fontFamily: FontFamily,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    strokethrough: boolean,
    color: Color,
};

type TextBlock = ObjectBlock & {
    type: BlockType.TEXT,
    value: Array<Char>,
};

type Crop = {
    x: number,
    y: number,
    width: number,
    height: number,
};

enum ImageSource {
    BINARY = 'binary',
    PATH = 'path',
}

type BaseImage = {
    typeValue: ImageSource,
    value: string,
};

type ImageBlock = BaseImage & ObjectBlock & {
    type: BlockType.IMAGE,
    opacity: number,
    crop?: Crop,
};

enum Primitives {
    CIRCLE = 'Circle',
    RECT = 'Rectangle',
    TRIANGLE = 'Triangle',
}

type PrimitiveBlock = ObjectBlock & {
    type: BlockType.PRIMITIVE,
    figure: Primitives,
    color: Array<Color>,
    borderSize: number,
    borderColor: Color,
    borderType: string,
};

type BackgroundImage = BaseImage & {
    scale: number,
};

type Background = {
    color: Array<Color>,
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
    Crop,
    Background,
    BackgroundImage,
    ImageBlock,
    Primitives,
    FontFamily,
    BlockType,
    Color,
    ImageSource,
};