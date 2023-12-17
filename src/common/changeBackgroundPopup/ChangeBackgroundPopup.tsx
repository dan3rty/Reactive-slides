import styles from './ChangeBackgroundPopup.css'
import {Slider} from "./slider/Slider";
import {useState} from "react";

function ChangeBackgroundPopup() {
    const [hue, setHue] = useState('0%')
    const [saturation, setSaturation] = useState('0%')
    const [lightness, setLightness] = useState('0%')
    console.log(`hsl(${hue}, ${saturation}, ${lightness})`)
    return (
        <div className={styles.popup}>
            <span>Hue</span>
            <Slider onSliderChange={setHue}/>
            <span>Saturation</span>
            <Slider onSliderChange={setSaturation}/>
            <span>Lightness </span>
            <Slider onSliderChange={setLightness}/>
            <div className={styles.colorBlock} style={{
                backgroundColor:`hsl(${ parseInt(hue.substring(0, hue.length-1)) * 3.6}, ${saturation}, ${lightness})`
            }}></div>
        </div>
    )
}

export {ChangeBackgroundPopup}
