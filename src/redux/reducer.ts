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
		case SlideActions.CHANGE_ORDER:
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
			state.forEach((slide) => {
				//TODO
				slide.objects.forEach((object, index) => {
					if (object.id == action.payload.objectId) {
						slide.objects[index] = action.payload.object
					}
				})
			})
			return state
		case SlideActions.ADD_OBJECT:
			state.forEach((slide) => {
				//TODO: использовать деструктуризацию, также прокидывать slideId
				if (slide.id == action.payload.slideId) {
					slide.objects.push(action.payload.object)
				}
			})
			return state
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
