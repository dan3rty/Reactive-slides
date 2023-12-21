import { SlideActionsType, SlideActions } from './slides'
import { Slide } from '../types'
import { presenter } from '../mock/mockObjects'
import { combineReducers } from 'redux'
import { SelectionActions, SelectionActionsType } from './selection'
import { Selection } from '../types'
import { TitleActions, TitleActionsType } from './title'

const initSlidesData: Slide[] = presenter.presentation.slides

const slidesReducer = (state: Slide[] = initSlidesData, action: SlideActionsType) => {
	switch (action.type) {
		case SlideActions.ADD_SLIDE:
			return state.concat(action.payload)
		case SlideActions.DELETE_SLIDE:
			return state.filter((slide) => slide.id !== action.payload)
		case SlideActions.CHANGE_SLIDE_ORDER:
			const removed = state.splice(action.payload.from, 1)
			state.splice(action.payload.to, 0, removed[0])
			return state
		case SlideActions.DELETE_OBJECTS:
			state.forEach((slide) => {
				slide.objects = slide.objects.filter(
					(object) => !action.payload.includes(object.id),
				)
			})
			return state
		case SlideActions.SET_SLIDES:
			return action.payload
		case SlideActions.CHANGE_OBJECT:
			return state.map((slide) => {
				if (slide.id == action.payload.slideId) {
					const newObjects = slide.objects.map((object) => {
						if (object.id == action.payload.objectId) {
							return {
								...object,
								...action.payload.propertyToChange,
							}
						}
						return object
					})
					return {
						...slide,
						objects: newObjects,
					}
				}
				return slide
			})
		case SlideActions.ADD_OBJECT:
			return state.map((slide) => {
				if (slide.id == action.payload.slideId) {
					slide.objects.push(action.payload.object)
				}
				return slide
			})
		case SlideActions.CHANGE_SLIDE_BACKGROUND:
			return state.map((slide) => {
				if (slide.id == action.payload.slideId) {
					return {
						...slide,
						background: action.payload.background,
					}
				}
				return slide
			})
		case SlideActions.MOVE_OBJECT_TO_TOP_LAYER:
			return state.map((slide) => {
				if (slide.id == action.payload.slideId) {
					const objectIndex = slide.objects.findIndex(
						(object) => object.id == action.payload.objectId,
					)
					const removed = slide.objects.splice(objectIndex, 1)[0]
					slide.objects.push(removed)
				}
				return slide
			})
		default:
			return state
	}
}

const initSelectionData: Selection = presenter.selection

const selectionReducer = (state: Selection = initSelectionData, action: SelectionActionsType) => {
	switch (action.type) {
		case SelectionActions.ADD_OBJECT_SELECTION:
			return {
				...state,
				objectsId: state.objectsId.concat(action.payload),
			}
		case SelectionActions.CHANGE_SLIDE_SELECTION:
			return {
				...state,
				slideId: action.payload,
			}
		case SelectionActions.CLEAR_OBJECTS_SELECTION:
			return {
				...state,
				objectsId: [],
			}
		case SelectionActions.CHANGE_TAB_SELECTION:
			return {
				...state,
				selectedTab: action.payload,
			}
		default:
			return state
	}
}

const initTitleData = presenter.presentation.title

const titleReducer = (state: string = initTitleData, action: TitleActionsType) => {
	switch (action.type) {
		case TitleActions.CHANGE_TITLE:
			return action.payload
		default:
			return state
	}
}

const rootReducer = combineReducers({
	slides: slidesReducer,
	selection: selectionReducer,
	title: titleReducer,
})

export { rootReducer }
