import {ReactElement, useRef, useState} from 'react'
import {MultipleColorPicker} from './multipleColorPicker/MultipleColorPicker'
import styles from './ChangeBackgroundPopup.css'
import {useAppActions, useAppSelector} from "../../redux/hooks";

function ChangeBackgroundPopup() {
    const [backgroundType, setBackgroundType] = useState('none')

    let window: ReactElement
    switch (backgroundType) {
        case 'gradient':
            window = <MultipleColorPicker/>
            break
        case 'none':
            window = <ChoseBackgroundType setBackgroundType={(color) => setBackgroundType(color)}/>
            break
    }
    return <div>{window}</div>
}

type ChoseBackgroundTypeProps = {
    setBackgroundType: (type: string) => void
}

function ChoseBackgroundType({setBackgroundType}: ChoseBackgroundTypeProps) {
    const fileInputRef = useRef<HTMLInputElement>()
    const selection = useAppSelector((state) => state.selection)
    const { createChangeSlideBackgroundAction } = useAppActions()
    return (
        <div className={styles.chose}>
            <div
                className={styles.pickButton}
                onClick={() => {
                    // setBackgroundType('image')
                    fileInputRef.current.click()
                }}
            >
                image
            </div>
            <input type={"file"} hidden={true} ref={fileInputRef} onInput={() => {
                if (fileInputRef.current) {
                    let file = fileInputRef.current.files[0];

                    let reader = new FileReader();

                    reader.readAsDataURL(file);

                    reader.onload = () => {
                        if (typeof reader.result === "string") {
                            setBackgroundType('image')
                            createChangeSlideBackgroundAction(selection.slideId, {
                                color: {
                                    colors: [],
                                    rotation: 0,
                                }, image: {
                                    value: reader.result,
                                    scale: 1,
                                }
                            })
                        }
                    }

                    reader.onerror = () => {
                        console.log(reader.error)
                    }
                }
            }}></input>
            <div
                className={styles.pickButton}
                onClick={() => {
                    setBackgroundType('gradient')
                }}
            >
                gradient
            </div>
        </div>
    )
}

export {
    ChangeBackgroundPopup
}
