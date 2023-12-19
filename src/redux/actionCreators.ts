import { SlideActions } from './actions'
import { Slide } from '../types'

function createAddSlideAction(slide: Slide) {
	return {
		type: SlideActions.ADD_SLIDE,
		payload: slide,
	}
}

function createDeleteSlideAction(slideId: string) {
	return {
		type: SlideActions.DELETE_SLIDE,
		payload: slideId,
	}
}

function createChangeOrderSlidesAction(from: number, to: number) {
	return {
		type: SlideActions.CHANGE_ORDER,
		payload: {
			from,
			to,
		},
	}
}

export { createAddSlideAction, createDeleteSlideAction, createChangeOrderSlidesAction }
