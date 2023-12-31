type ObjectBlock = {
	width: number
	height: number
	x: number
	y: number
	rotation: number
}

type ObjectState = {
	id: string
	keyPercent: number // keyframes
	state: ObjectBlock
}

type ObjectStateList = {
	stateList: Array<ObjectState>
	duration: number
	looped: boolean
}

type CommonObjectProperties = {
	id: string
	baseState: ObjectBlock
	animation: ObjectStateList
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
	hsl: string
	opacity: number
	percent: string
}

type GradientColor = {
	colors: Array<Color>
	rotation: number
}

enum VerticalAligns {
	TOP = 'start',
	CENTER = 'center',
	BOTTOM = 'end',
}

enum HorizontalAligns {
	RIGHT = 'right',
	CENTER = 'center',
	LEFT = 'left',
}

type TextBlock = CommonObjectProperties & {
	blockType: BlockType.TEXT
	value: string
	fontSize: number
	fontFamily: FontFamily
	bold: boolean
	italic: boolean
	underline: boolean
	strokethrough: boolean
	color: Color
	verticalAlign: VerticalAligns
	horizontalAlign: HorizontalAligns
}

type Crop = {
	x: number
	y: number
	width: number
	height: number
}

type BaseImage = {
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
	color: Color
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
	objectId?: string
	keyFrameId?: string
}

type Presenter = {
	previewMode: boolean
	presentation: Presentation
	selection: Selection
}

export type {
	Presenter,
	Selection,
	Presentation,
	Slide,
	ObjectBlock,
	ObjectState,
	ObjectStateList,
	PrimitiveBlock,
	TextBlock,
	Crop,
	Background,
	BackgroundImage,
	ImageBlock,
	Color,
	GradientColor,
}

export { Primitives, FontFamily, BlockType, BorderTypes, Tabs, HorizontalAligns, VerticalAligns }
