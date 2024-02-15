import { SlideActions, SlideActionsType } from './slides'
import { Presenter, Tabs } from '../model/types'
import { presenter } from '../mock/mockObjects'
import { SelectionActions, SelectionActionsType } from './selection'
import { TitleActions, TitleActionsType } from './title'
import { PreviewModeActions, PreviewModeActionsType } from './previewMode'
import { generateBlankSlide } from '../model/utils'
import { createHistory } from '../model/History'
import { HistoryActions, HistoryActionsType } from './history'

const history = createHistory<Presenter>(presenter)

const rootReducer = (
	state: Presenter = presenter,
	action:
		| SlideActionsType
		| PreviewModeActionsType
		| SelectionActionsType
		| TitleActionsType
		| HistoryActionsType,
) => {
	switch (action.type) {
		case SlideActions.ADD_SLIDE: {
			const slides = state.presentation.slides
			const currentSlideIndex = slides.findIndex((slide) => slide.id === action.payload)
			const newSlides = [
				...slides.slice(0, currentSlideIndex + 1),
				generateBlankSlide(),
				...slides.slice(currentSlideIndex + 1),
			]
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.DELETE_SLIDE: {
			const newSlides = state.presentation.slides.filter(
				(slide) => slide.id !== action.payload,
			)
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.CHANGE_SLIDE_ORDER: {
			const removed = state.presentation.slides.splice(action.payload.from, 1)
			state.presentation.slides.splice(action.payload.to, 0, removed[0])
			const newState = { ...state }
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.DELETE_OBJECT: {
			const newSlides = state.presentation.slides.map((slide) => {
				if (slide.id == action.payload.slideId) {
					return {
						...slide,
						objects: slide.objects.filter((obj) => action.payload.objectId != obj.id),
					}
				}
				return slide
			})
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.SET_SLIDES: {
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: action.payload,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.CHANGE_OBJECT: {
			const newSlides = state.presentation.slides.map((slide) => {
				if (slide.id == action.payload.slideId) {
					const newObjects = slide.objects.map((object) => {
						if (action.payload.objectId == object.id) {
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
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.ADD_OBJECT: {
			const newSlides = state.presentation.slides.map((slide) => {
				if (slide.id == action.payload.slideId) {
					slide.objects.push(action.payload.object)
				}
				return slide
			})
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.CHANGE_SLIDE_BACKGROUND: {
			const newSlides = state.presentation.slides.map((slide) => {
				if (slide.id == action.payload.slideId) {
					return {
						...slide,
						background: action.payload.background,
					}
				}
				return slide
			})
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.MOVE_OBJECT_TO_TOP_LAYER: {
			const newSlides = state.presentation.slides.map((slide) => {
				if (slide.id == action.payload.slideId) {
					const objectIndex = slide.objects.findIndex(
						(object) => object.id == action.payload.objectId,
					)
					const removed = slide.objects.splice(objectIndex, 1)[0]
					slide.objects.push(removed)
				}
				return slide
			})
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					slides: newSlides,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SlideActions.CREATE_BLANK_PRESENTATION: {
			const slide = generateBlankSlide()
			const newState: Presenter = {
				previewMode: false,
				presentation: {
					title: 'Новая презентация',
					slides: [slide],
				},
				selection: {
					objectId: '',
					keyFrameId: '',
					slideId: slide.id,
					selectedTab: Tabs.CREATE,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SelectionActions.CHANGE_OBJECT_SELECTION: {
			const newState: Presenter = {
				...state,
				selection: {
					...state.selection,
					objectId: action.payload,
					keyFrameId: '',
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SelectionActions.CHANGE_SLIDE_SELECTION: {
			const newState: Presenter = {
				...state,
				selection: {
					...state.selection,
					objectId: null,
					slideId: action.payload,
					keyFrameId: '',
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SelectionActions.CLEAR_OBJECT_SELECTION: {
			const newState: Presenter = {
				...state,
				selection: {
					...state.selection,
					objectId: null,
					keyFrameId: '',
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SelectionActions.CHANGE_TAB_SELECTION: {
			const newState: Presenter = {
				...state,
				selection: {
					...state.selection,
					selectedTab: action.payload,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case SelectionActions.CHANGE_KEYFRAME_SELECTION: {
			const newState: Presenter = {
				...state,
				selection: {
					...state.selection,
					keyFrameId: action.payload,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case PreviewModeActions.START_PREVIEW: {
			const newState: Presenter = {
				...state,
				previewMode: true,
			}
			return newState
		}
		case PreviewModeActions.END_PREVIEW: {
			const newState: Presenter = {
				...state,
				previewMode: false,
			}
			return newState
		}
		case TitleActions.CHANGE_TITLE: {
			const newState: Presenter = {
				...state,
				presentation: {
					...state.presentation,
					title: action.payload,
				},
			}
			history.addHistoryItem(newState)
			return newState
		}
		case HistoryActions.UNDO:
			const prevState = history.undo()
			if (prevState) {
				return prevState
			}
			return state
		case HistoryActions.REDO:
			const nextState = history.redo()
			if (nextState) {
				return nextState
			}
			return state
		default:
			return state
	}
}

export { rootReducer }
