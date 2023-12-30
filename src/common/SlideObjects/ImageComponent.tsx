import styles from './ImageComponent.css'
import { ImageBlock } from '../../types'

type ImageProps = {
	image: ImageBlock
	scale: number
	onClick: () => void
	isWorkspace?: boolean
	slideId: string
}

const ImageComponent = function ({ image, onClick }: ImageProps) {
	return (
		<img
			draggable='false'
			className={styles.image}
			src={image.value}
			alt='image'
			onClick={onClick}
		></img>
	)
}

export { ImageComponent }
