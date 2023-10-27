import React, {useContext} from 'react'
import './SlideEditor.css'
import {presentation} from "../../../App";
import {TextComponent} from "../../../common/slideObjects/TextComponent";
import {text} from "../../../mockObjects";

function SlideEditor() {
	const chosen = useContext(presentation).selection.slideId
	const curSlide = useContext(presentation).presentation.slides.find((slide) => slide.id === chosen)
	return <div className='slide-editor'>
		{TextComponent({text})}
	</div>
}

export { SlideEditor }
