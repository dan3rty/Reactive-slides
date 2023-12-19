import styles from './ColorPicker.css'
import { Slider } from './slider/Slider'
import { useEffect, useRef, useState } from 'react'

type ColorPickerProps = {
	onColorPick: (color: string) => void
}

function ColorPicker({ onColorPick }: ColorPickerProps) {
	const [hue, setHue] = useState('0%')
	const [saturation, setSaturation] = useState('0%')
	const [lightness, setLightness] = useState('0%')
	const buttonRef = useRef<HTMLDivElement>()
	function handleOnColorPick() {
		onColorPick(
			`hsl(${parseInt(hue.substring(0, hue.length - 1)) * 3.6}, ${saturation}, ${lightness})`,
		)
	}
	useEffect(() => {
		buttonRef?.current?.addEventListener('click', handleOnColorPick)
	}, [hue, saturation, lightness])
	return (
		<div className={styles.popup}>
			<div className={styles.sliders}>
				<span>Hue</span>
				<Slider onSliderChange={setHue} />
				<span>Saturation</span>
				<Slider onSliderChange={setSaturation} />
				<span>Lightness </span>
				<Slider onSliderChange={setLightness} />
				<span className={styles.pickButton} ref={buttonRef}>
					pick color
				</span>
			</div>
			<div
				className={styles.colorBlock}
				style={{
					backgroundColor: `hsl(${
						parseInt(hue.substring(0, hue.length - 1)) * 3.6
					}, ${saturation}, ${lightness})`,
				}}
			></div>
		</div>
	)
}

export { ColorPicker }
