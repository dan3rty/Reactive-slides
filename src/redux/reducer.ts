import { Actions, SlideActions } from './actions'
import { Slide } from '../types'
import { presenter } from '../mock/mockObjects'
import { combineReducers } from 'redux'

const initData: Slide[] = presenter.presentation.slides

const slidesReducer = (state: Slide[] = initData, action: Actions) => {
	switch (action.type) {
		case SlideActions.ADD_SLIDE:
			return state.concat(action.payload)
		case SlideActions.DELETE_SLIDE:
			return state.filter((slide) => slide.id !== action.payload)
		case SlideActions.CHANGE_ORDER:
			const removed = state.splice(action.payload.from, 1)
			state.splice(action.payload.to, 0, removed[0])
			return state
		default:
			return state
	}
}

const rootReducer = combineReducers({
	slides: slidesReducer,
})

export { rootReducer }
