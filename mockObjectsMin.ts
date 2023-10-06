import * as Type from './types'

const WhiteColor: Type.Color = {
    hex: "#FFFFFF",
    opacity: 0,
}

const background: Type.Background = {
    color: {
        colors: [WhiteColor],
    },
}

const slide: Type.Slide = {
    id: "DHASDH7585dASD",
    background,
    objects: [],
}

const presentation: Type.Presentation = {
    title: "Min presentation",
    slides: [slide],
}

const selection: Type.Selection = {
    slideId: "DHASDH7585dASD",
}

const operationHistory: Type.OperationHistory = {
    operations: [],
}

const presenter: Type.Presenter = {
    presentation,
    selection,
    operationHistory,
}

export {
    presenter,
    operationHistory,
    selection,
    presentation,
    slide,
    background,
}