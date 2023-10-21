import React from 'react'
import './TopBar.css'
import { LeftBlock } from './LeftBlock/LeftBlock'
import { RightBlock } from './RightBlock/RightBlock'
function TopBar() {
	return (
		<div className='TopBar'>
			<LeftBlock></LeftBlock>
			<RightBlock presentationName='sample presentation name'></RightBlock>
		</div>
	)
}

export { TopBar }
