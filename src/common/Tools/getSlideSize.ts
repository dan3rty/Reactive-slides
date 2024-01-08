function getSlideSize() {
    return {
        width: 1920,
        height: 1080,
    }
}

function getScaledSlideSize(scale: number) {
    return {
        width: 1920 / scale,
        height: 1080 / scale,
    }
}

export {
    getSlideSize,
    getScaledSlideSize,
}