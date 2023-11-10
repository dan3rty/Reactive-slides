import React from 'react'
import styles from './AddSlideButton.module.css'

type AddSlideButtonProps = {
	scale: number
}
function AddSlideButton(props: AddSlideButtonProps) {
	return (
		<div className={styles.slideList}>
			<span>create slide</span>
		</div>
	)
}

export { AddSlideButton }
