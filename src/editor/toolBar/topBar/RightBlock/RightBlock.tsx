import React from 'react'
import './RightBlock.css'

type RightBlockProps = {
	presentationName: string
}
function RightBlock(props: RightBlockProps) {
	return <span className='PresentationName'>{props.presentationName}</span>
}

export { RightBlock }
