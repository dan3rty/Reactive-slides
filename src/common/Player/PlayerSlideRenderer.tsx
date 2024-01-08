import styles from './PlayerSlideRenderer.css'
import {Slide} from '../../types'
import {returnGradientString} from '../Tools/returnGradientString'
import {joinCssClasses} from '../../classes/joinCssClasses'
import {SlideElement} from "../SlideEditor/SlideElement";
import {getScaledSlideSize, getSlideSize} from "../Tools/getSlideSize";

type SlideRendererProps = {
    slide: Slide
}

function PlayerSlideRenderer({ slide }: SlideRendererProps) {
    const scale = getSlideSize().height / window.innerHeight
    let {width, height} = getScaledSlideSize(scale)

    const backgroundStyle = slide.background.image
        ? { backgroundImage: `url("${slide.background.image.value}")` }
        : { background: returnGradientString(slide.background.color) }

    return (
        <div
            style={{
                ...backgroundStyle,
                width: `${width}px`,
                height: `${height}px`,
            }}
            className={joinCssClasses(
                styles.slide,
            )}
        >
            {slide.objects.map((obj, index) => {
                return (
                    <SlideElement
                        isPlayer={true}
                        key={index}
                        object={obj}
                        isWorkspace={false}
                        slideId={slide.id}
                        scale={scale}
                        slideRef={null}
                    />
                )
            })}
        </div>
    )
}

export { PlayerSlideRenderer }
