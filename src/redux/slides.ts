import { Background, ImageBlock, PrimitiveBlock, Slide, TextBlock } from '../types'

enum SlideActions {
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_SLIDE = 'ADD_SLIDE',
	CHANGE_ORDER = 'CHANGE_ORDER',
	DELETE_OBJECTS = 'DELETE_OBJECTS',
	SET_SLIDES = 'SET_SLIDES',
	CHANGE_OBJECT = 'CHANGE_OBJECT',
	ADD_OBJECT = 'ADD_OBJECT',
	CHANGE_SLIDE_BACKGROUND = 'CHANGE_SLIDE_BACKGROUND',
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

type SlideActionsType =
	| DeleteSlideAction
	| AddSlideAction
	| ChangeOrderSlidesAction
	| DeleteObjectAction
	| SetSlidesAction
	| ChangeObjectAction
	| AddObjectAction
	| ChangeSlideBackgroundAction

export { SlideActions, type SlideActionsType }
