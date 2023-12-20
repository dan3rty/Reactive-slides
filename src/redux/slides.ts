import { Slide } from '../types'

enum SlideActions {
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_SLIDE = 'ADD_SLIDE',
	CHANGE_ORDER = 'CHANGE_ORDER',
	DELETE_OBJECTS = 'DELETE_OBJECTS',
}

type DeleteSlideAction = {
	type: SlideActions.DELETE_SLIDE
	payload: string
}

type AddSlideAction = {
	type: SlideActions.ADD_SLIDE
	payload: Slide
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

type SlideActionsType =
	| DeleteSlideAction
	| AddSlideAction
	| ChangeOrderSlidesAction
	| DeleteObjectAction

export { SlideActions, type SlideActionsType }
