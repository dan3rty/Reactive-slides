import { useContext } from 'react'
import styles from './SlideRenderer.module.css'
import { PresenterContext } from '../../App'
import { TextComponent } from '../SlideObjects/TextComponent'
import { BlockType, Selection, Slide, Tabs } from '../../types'
import { ImageComponent } from '../SlideObjects/ImageComponent'
import { returnGradientString } from '../Tools/returnGradientString'
import { PrimitiveComponent } from '../SlideObjects/PrimitiveComponent'

type SlideRendererProps = {
	scale: number
	slide: Slide
	selection?: Selection
}

function SlideRenderer({ scale, slide, selection }: SlideRendererProps) {
	const width = 1920 / scale
	const height = 1080 / scale

	const selectedTab = useContext(PresenterContext).presenter.selection.selectedTab

	const backgroundStyle = slide.background.image
		? {
				backgroundImage: `url("${slide.background.image.value}")`,
		  }
		: {
				background: returnGradientString(slide.background.color),
		  }

	return (
		<div
			style={{
				...backgroundStyle,
				width: `${width}px`,
				height: `${height}px`,
			}}
			className={styles.slideEditor}
		>
			{slide.objects.map((obj) => {
				const newObj = structuredClone(obj)
				if (selection) {
					const selected = !!selection?.objectsId?.includes(obj.id)

					if (
						obj.animation &&
						selection.keyFrameId &&
						selected &&
						selectedTab == Tabs.ANIMATION
					) {
						const index = obj.animation.stateList.findIndex(
							(state) => state.id === selection.keyFrameId,
						)

						newObj.baseState.width = obj.animation.stateList[index].state.width
						newObj.baseState.height = obj.animation.stateList[index].state.height
						newObj.baseState.rotation = obj.animation.stateList[index].state.rotation
						newObj.baseState.x = obj.animation.stateList[index].state.x
						newObj.baseState.y = obj.animation.stateList[index].state.y
					}
				}
				switch (newObj.blockType) {
					case BlockType.IMAGE:
						return (
							<ImageComponent
								image={newObj}
								scale={scale}
								selected={!!selection?.objectsId?.includes(obj.id)}
							/>
						)
					case BlockType.PRIMITIVE:
						return (
							<PrimitiveComponent
								primitive={newObj}
								scale={scale}
								selected={!!selection?.objectsId?.includes(obj.id)}
							/>
						)
					case BlockType.TEXT:
						return (
							<TextComponent
								text={newObj}
								scale={scale}
								selected={!!selection?.objectsId?.includes(obj.id)}
							/>
						)
				}
			})}
		</div>
	)
}

export { SlideRenderer }
