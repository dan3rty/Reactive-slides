import { Background, ImageBlock, PrimitiveBlock, Slide, TextBlock } from '../model/types'

enum SlideActions {
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_SLIDE = 'ADD_SLIDE',
	CHANGE_SLIDE_ORDER = 'CHANGE_SLIDE_ORDER',
	DELETE_OBJECT = 'DELETE_OBJECT',
	SET_SLIDES = 'SET_SLIDES',
	CHANGE_OBJECT = 'CHANGE_OBJECT',
	ADD_OBJECT = 'ADD_OBJECT',
	CHANGE_SLIDE_BACKGROUND = 'CHANGE_SLIDE_BACKGROUND',
	MOVE_OBJECT_TO_TOP_LAYER = 'MOVE_OBJECT_TO_TOP_LAYER',
	CREATE_BLANK_PRESENTATION = 'CREATE_BLANK_PRESENTATION',
}

type DeleteSlideAction = {
	type: SlideActions.DELETE_SLIDE
	payload: string
}

type AddSlideAction = {
	type: SlideActions.ADD_SLIDE
	payload: string
}

type SetSlidesAction = {
	type: SlideActions.SET_SLIDES
	payload: Slide[]
}

type ChangeOrderSlidesAction = {
	type: SlideActions.CHANGE_SLIDE_ORDER
	payload: {
		from: number
		to: number
	}
}

type DeleteObjectAction = {
	type: SlideActions.DELETE_OBJECT
	payload: {
		slideId: string
		objectId: string
	}
}

type ChangeObjectAction = {
	type: SlideActions.CHANGE_OBJECT
	payload: {
		slideId: string
		objectId: string
		propertyToChange: object
	}
}

type AddObjectAction = {
	type: SlideActions.ADD_OBJECT
	payload: {
		object: PrimitiveBlock | TextBlock | ImageBlock
		slideId: string
	}
}

type ChangeSlideBackgroundAction = {
	type: SlideActions.CHANGE_SLIDE_BACKGROUND
	payload: {
		slideId: string
		background: Background
	}
}

type MoveObjectToTopLayer = {
	type: SlideActions.MOVE_OBJECT_TO_TOP_LAYER
	payload: {
		slideId: string
		objectId: string
	}
}

type CreateBlankPresentation = {
	type: SlideActions.CREATE_BLANK_PRESENTATION
}

type SlideActionsType =
	| DeleteSlideAction
	| AddSlideAction
	| ChangeOrderSlidesAction
	| DeleteObjectAction
	| SetSlidesAction
	| ChangeObjectAction
	| AddObjectAction
	| ChangeSlideBackgroundAction
	| MoveObjectToTopLayer
	| CreateBlankPresentation

export { SlideActions, type SlideActionsType }
