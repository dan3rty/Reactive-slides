import styles from './ImageComponent.css'
import { ImageBlock, ImageSource } from '../../types'

type ImageProps = {
	image: ImageBlock
	scale: number
	onClick: () => void
	isWorkspace?: boolean
	slideId: string
}

const ImageComponent = function ({ image, onClick }: ImageProps) {
	if (image.typeValue === ImageSource.PATH) {
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
	return null
}

export { ImageComponent }
