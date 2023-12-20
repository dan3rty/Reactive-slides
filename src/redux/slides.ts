import { ImageBlock, PrimitiveBlock, Slide, TextBlock } from '../types'

enum SlideActions {
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_SLIDE = 'ADD_SLIDE',
	CHANGE_ORDER = 'CHANGE_ORDER',
	DELETE_OBJECTS = 'DELETE_OBJECTS',
	SET_SLIDES = 'SET_SLIDES',
	CHANGE_OBJECT = 'CHANGE_OBJECT',
	ADD_OBJECT = 'ADD_OBJECT',
}

type DeleteSlideAction = {
	type: SlideActions.DELETE_SLIDE
	payload: string
}

type AddSlideAction = {
	type: SlideActions.ADD_SLIDE
	payload: Slide
}

type SetSlidesAction = {
	type: SlideActions.SET_SLIDES
	payload: Slide[]
}

type ChangeOrderSlidesAction = {
	type: SlideActions.CHANGE_ORDER
	payload: {
		from: number
		to: number
	}
}

type DeleteObjectAction = {
	type: SlideActions.DELETE_OBJECTS
	payload: string[]
}

type ChangeObjectAction = {
	type: SlideActions.CHANGE_OBJECT
	payload: {
		objectId: string
		object: PrimitiveBlock | TextBlock | ImageBlock
	}
}

type AddObjectAction = {
	type: SlideActions.ADD_OBJECT
	payload: {
		object: PrimitiveBlock | TextBlock | ImageBlock
		slideId: string
	}
}

type SlideActionsType =
	| DeleteSlideAction
	| AddSlideAction
	| ChangeOrderSlidesAction
	| DeleteObjectAction
	| SetSlidesAction
	| ChangeObjectAction
	| AddObjectAction

export { SlideActions, type SlideActionsType }
