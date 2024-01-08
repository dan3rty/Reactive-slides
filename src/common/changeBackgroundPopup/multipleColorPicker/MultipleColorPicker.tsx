import styles from './MiltipleColorPicker.css'
import { Slider } from './slider/Slider'
import { useEffect, useRef, useState } from 'react'
import { returnGradientString } from '../../Tools/returnGradientString'
import { GradientColor } from '../../../model/types'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

function createGradientColor(allColors: GradientColor, angle: string): GradientColor {
	return {
		colors: allColors.colors,
		rotation: parseInt(angle.substring(0, angle.length - 1)) * 3.6,
	}
}

function MultipleColorPicker() {
	const selection = useAppSelector((state) => state.selection)
	const { createChangeSlideBackgroundAction } = useAppActions()

	const [hue, setHue] = useState('0%')
	const [saturation, setSaturation] = useState('0%')
	const [lightness, setLightness] = useState('0%')
	const [angle, setAngle] = useState('0%')
	const [percent, setPercent] = useState('0%')
	const [allColors, setAllColors] = useState<GradientColor | null>(null)
	const pickColorButtonRef = useRef<HTMLDivElement>()
	const addColorButtonRef = useRef<HTMLDivElement>()
	const resetColorButtonRef = useRef<HTMLDivElement>()

	function handleOnColorAdd() {
		setAllColors(
			allColors === null
				? {
						colors: [
							{
								hsl: `hsl(${
									parseInt(hue.substring(0, hue.length - 1)) * 3.6
								}, ${saturation}, ${lightness}) ${percent}`,
								opacity: 1,
								percent,
							},
						],
						rotation: parseInt(angle.substring(0, angle.length - 1)) * 3.6,
				  }
				: {
						colors: [
							...allColors.colors,
							{
								hsl: `hsl(${
									parseInt(hue.substring(0, hue.length - 1)) * 3.6
								}, ${saturation}, ${lightness})`,
								opacity: 1,
								percent,
							},
						],
						rotation: parseInt(angle.substring(0, angle.length - 1)) * 3.6,
				  },
		)
	}

	function handleOnColorPick() {
		const color: GradientColor =
			allColors === null
				? {
						colors: [
							{
								hsl: `hsl(${
									parseInt(hue.substring(0, hue.length - 1)) * 3.6
								}, ${saturation}, ${lightness})`,
								opacity: 1,
								percent: '100%',
							},
						],
						rotation: 0,
				  }
				: createGradientColor(allColors, angle)
		createChangeSlideBackgroundAction(selection.slideId, { color })
	}

	function handleOnColorReset() {
		setAllColors(null)
	}

	useEffect(() => {
		addColorButtonRef?.current?.addEventListener('click', handleOnColorAdd)
		pickColorButtonRef?.current?.addEventListener('click', handleOnColorPick)
		resetColorButtonRef?.current?.addEventListener('click', handleOnColorReset)
		return () => {
			addColorButtonRef?.current?.removeEventListener('click', handleOnColorAdd)
			pickColorButtonRef?.current?.removeEventListener('click', handleOnColorPick)
			resetColorButtonRef?.current?.removeEventListener('click', handleOnColorReset)
		}
	}, [hue, saturation, lightness, allColors, percent])
	return (
		<div className={styles.popup}>
			<div className={styles.sliders}>
				<span>Hue</span>
				<Slider onSliderChange={setHue} />
				<span>Saturation</span>
				<Slider onSliderChange={setSaturation} />
				<span>Lightness </span>
				<Slider onSliderChange={setLightness} />
				<span>Angle </span>
				<Slider onSliderChange={setAngle} />
				<span>Percent </span>
				<Slider onSliderChange={setPercent} />
				<div>
					<span className={styles.pickButton} ref={addColorButtonRef}>
						add color
					</span>
					<span className={styles.pickButton} ref={pickColorButtonRef}>
						pick gradient
					</span>
					<span className={styles.pickButton} ref={resetColorButtonRef}>
						reset colors
					</span>
				</div>
			</div>
			<div className={styles.preview}>
				<span>Preview</span>
				<div
					className={styles.colorBlock}
					style={{
						background:
							allColors === null
								? `hsl(${
										parseInt(hue.substring(0, hue.length - 1)) * 3.6
								  }, ${saturation}, ${lightness})`
								: returnGradientString({
										colors: [
											...allColors.colors,
											{
												hsl: `hsl(${
													parseInt(hue.substring(0, hue.length - 1)) * 3.6
												}, ${saturation}, ${lightness})`,
												opacity: 1,
												percent,
											},
										],
										rotation:
											parseInt(angle.substring(0, angle.length - 1)) * 3.6,
								  }),
					}}
				></div>
				<span>Result</span>
				<div
					className={styles.colorBlock}
					style={{
						background:
							allColors === null
								? `hsl(${
										parseInt(hue.substring(0, hue.length - 1)) * 3.6
								  }, ${saturation}, ${lightness})`
								: returnGradientString(createGradientColor(allColors, angle)),
					}}
				></div>
			</div>
		</div>
	)
}

export { MultipleColorPicker }
