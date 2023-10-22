import React, { useContext } from 'react'
import './SlideList.css'
import { presentation } from '../../../App'

function SlideList() {
	const slides = useContext(presentation).presentation.slides
	const slidesToRender = slides.map((slide) => <div className='small-slide'></div>)

	return <div className='slide-list'></div>
}

export { SlideList }
