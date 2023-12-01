import {RefObject, useContext, useEffect} from "react";
import {PresenterContext} from "../presenterContext/PresenterContext";
import {Presenter, Slide} from "../types";

type useDraggableObjectProps = {
    elementRef: RefObject<HTMLDivElement>
    elementId: string
    slideId: string
}
function useDraggableObject(props: useDraggableObjectProps) {
    const {presenter, setPresenter, editedSlideRef} = useContext(PresenterContext)
    const size = window.innerHeight
    const scale = (1080 / (size - 205)) * 1.2
    function moving(e) {
        console.log('fdsfdfsdfsd')
        let obj = presenter.presentation.slides.find(slide => slide.id === props.slideId).objects.find(object => object.id === props.elementId)
        const rect = editedSlideRef.current.getBoundingClientRect();
        const dx = (e.clientX - rect.x) * scale - obj.x
        const dy = (e.clientY - rect.y) * scale - obj.y
        obj = {
            ...obj,
            baseState: {
                ...obj.baseState,
                x: obj.baseState.x + dx,
                y: obj.baseState.y + dy,
            }
        }
        const slideIndex = presenter.presentation.slides.findIndex(slide => slide.id === props.slideId)
        const newSlide: Slide = {
            ...presenter.presentation.slides[slideIndex],
            objects: presenter.presentation.slides[slideIndex].objects.map(object => {
                if (object.id === props.elementId) {
                    return obj
                }
                else {
                    return object
                }
            })
        }
        const newSlides: Array<Slide> = presenter.presentation.slides
        newSlides[slideIndex] = newSlide
        const newPresenter: Presenter = {
            ...presenter,
            presentation: {
                ...presenter.presentation,
                slides: newSlides,
            }
        }
        setPresenter(newPresenter)
    }
    function startMoving() {
        props.elementRef.current.removeEventListener('onMouseDown', startMoving)
        props.elementRef.current.addEventListener('onMoseMove', moving)
        props.elementRef.current.addEventListener('onMoseUp', stopMoving)
    }
    function stopMoving() {
        props.elementRef.current.removeEventListener('onMoseMove', moving)
        props.elementRef.current.removeEventListener('onMoseUp', stopMoving)
        props.elementRef.current.addEventListener('onMouseDown', startMoving)
    }
    useEffect(() => {
        console.log('aa')
        props.elementRef.current.addEventListener('onMouseDown', startMoving)
    }, []);
}

export {
    useDraggableObject
}