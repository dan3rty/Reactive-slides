type ObjectBlock = {
	width: number
	height: number
	x: number
	y: number
	rotation: number
}

type ObjectState = {
	keyPercent: number // keyframes
	state: ObjectBlock
}

type ObjectStateList = {
	stateList: Array<ObjectState>
	duration: number
}

type CommonObjectProperties = {
	id: string
	baseState: ObjectBlock
	animation?: ObjectStateList
}

enum BlockType {
	IMAGE = 'image',
	TEXT = 'text',
	PRIMITIVE = 'primitive',
}

enum Tabs {
	CREATE = 'create',
	EDIT = 'edit',
	ANIMATION = 'animation',
}
enum FontFamily {
	ARIAL = 'Arial',
	TIMES_NEW_ROMAN = 'Times New Roman',
}

type Color = {
	hex: string
	opacity: number
}

type GradientColor = {
	colors: Array<Color>
}

type Char = {
	value: string
	fontSize: number
	fontFamily: FontFamily
	bold: boolean
	italic: boolean
	underline: boolean
	strokethrough: boolean
	color: Color
}

type TextBlock = CommonObjectProperties & {
	blockType: BlockType.TEXT
	value: Array<Char>
}

type Crop = {
	x: number
	y: number
	width: number
	height: number
}

enum ImageSource {
	BINARY = 'binary',
	PATH = 'path',
}

type BaseImage = {
	typeValue: ImageSource
	value: string
}

type ImageBlock = BaseImage &
	CommonObjectProperties & {
		blockType: BlockType.IMAGE
		opacity: number
		crop?: Crop
	}

enum Primitives {
	CIRCLE = 'Circle',
	RECT = 'Rectangle',
	TRIANGLE = 'Triangle',
}

enum BorderTypes {
	SOLID = 'Solid',
	DASHED = 'Dashed',
	DOTTED = 'Dotted',
}

type PrimitiveBlock = CommonObjectProperties & {
	blockType: BlockType.PRIMITIVE
	primitiveType: Primitives
	color: GradientColor
	borderSize: number
	borderColor: Color
	borderType: BorderTypes
}

type BackgroundImage = BaseImage & {
	scale: number
}

type Background = {
	color: GradientColor
	image?: BackgroundImage
}

type Slide = {
	id: string
	background: Background
	objects: Array<TextBlock | PrimitiveBlock | ImageBlock>
}

type Presentation = {
	title: string
	slides: Array<Slide>
}

type Selection = {
	selectedTab: Tabs
	slideId: string
	objectsId?: Array<string>
}

type Operation = object

type OperationHistory = {
	operations: Array<Operation>
	curIndex?: number
}

type Presenter = {
	presentation: Presentation
	selection: Selection
	operationHistory: OperationHistory
}

export type {
	Presenter,
	OperationHistory,
	Operation,
	Selection,
	Presentation,
	Slide,
	ObjectBlock,
	ObjectStateList,
	PrimitiveBlock,
	TextBlock,
	Char,
	Crop,
	Background,
	BackgroundImage,
	ImageBlock,
	Color,
	GradientColor,
}

export { Primitives, FontFamily, BlockType, ImageSource, BorderTypes, Tabs }
