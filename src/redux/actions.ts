import { Slide } from '../types'

enum SlideActions {
	DELETE_SLIDE = 'DELETE_SLIDE',
	ADD_SLIDE = 'ADD_SLIDE',
	CHANGE_ORDER = 'CHANGE_ORDER',
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

type Actions = DeleteSlideAction | AddSlideAction | ChangeOrderSlidesAction

export { SlideActions, type Actions }
