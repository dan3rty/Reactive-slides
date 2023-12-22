import { SlideActions } from './slides'
import { Background, ImageBlock, PrimitiveBlock, Slide, Tabs, TextBlock } from '../types'
import { SelectionActions } from './selection'
import { TitleActions } from './title'

function createAddSlideAction() {
	return {
		type: SlideActions.ADD_SLIDE,
	}
}

function createSetSlidesAction(slides: Slide[]) {
	return {
		type: SlideActions.SET_SLIDES,
		payload: slides,
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
		type: SlideActions.CHANGE_SLIDE_ORDER,
		payload: {
			from,
			to,
		},
	}
}

function createMoveObjectToTopLayer(slideId: string, objectId: string) {
	return {
		type: SlideActions.MOVE_OBJECT_TO_TOP_LAYER,
		payload: {
			slideId,
			objectId,
		},
	}
}

function createDeleteObjectAction(slideId: string, objectIds: string[]) {
	return {
		type: SlideActions.DELETE_OBJECTS,
		payload: {
			slideId,
			objectIds,
		},
	}
}

function createChangeObjectAction(slideId: string, objectId: string, propertyToChange: object) {
	return {
		type: SlideActions.CHANGE_OBJECT,
		payload: {
			slideId,
			objectId,
			propertyToChange,
		},
	}
}

function createChangeSlideBackgroundAction(slideId: string, background: Background) {
	return {
		type: SlideActions.CHANGE_SLIDE_BACKGROUND,
		payload: {
			slideId,
			background,
		},
	}
}

function createAddObjectAction(slideId: string, object: TextBlock | ImageBlock | PrimitiveBlock) {
	return {
		type: SlideActions.ADD_OBJECT,
		payload: {
			slideId,
			object,
		},
	}
}

function createChangeSlideSelectionAction(slideId: string) {
	return {
		type: SelectionActions.CHANGE_SLIDE_SELECTION,
		payload: slideId,
	}
}

function createAddObjectSelectionAction(objectId: string) {
	return {
		type: SelectionActions.ADD_OBJECT_SELECTION,
		payload: objectId,
	}
}

function createClearObjectSelectionAction() {
	return {
		type: SelectionActions.CLEAR_OBJECTS_SELECTION,
	}
}

function createChangeTabSelectionAction(tab: Tabs) {
	return {
		type: SelectionActions.CHANGE_TAB_SELECTION,
		payload: tab,
	}
}

function createChangeTitleAction(newTitle: string) {
	return {
		type: TitleActions.CHANGE_TITLE,
		payload: newTitle,
	}
}

export {
	createAddSlideAction,
	createDeleteSlideAction,
	createChangeOrderSlidesAction,
	createDeleteObjectAction,
	createChangeObjectAction,
	createAddObjectAction,
	createChangeSlideSelectionAction,
	createAddObjectSelectionAction,
	createClearObjectSelectionAction,
	createChangeTabSelectionAction,
	createChangeTitleAction,
	createSetSlidesAction,
	createChangeSlideBackgroundAction,
	createMoveObjectToTopLayer,
}
