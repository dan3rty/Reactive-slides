import React, { useContext } from 'react'
import './SlideList.css'
import { presentation } from '../../../App'

function SlideList() {
	const slides = useContext(presentation).presentation.slides
	const slidesToRender = slides.map((slide) => <div className='small-slide'>{slide.id}</div>)

	return <div className='slide-list'>{slidesToRender}</div>
}

export { SlideList }
