import styles from './AddBar.css'
import {Button} from '../../../../common/Components/Buttons/Button'
import {
    BulletListIcon,
    ImageIcon,
    NumberedListIcon,
    OvalIcon,
    SquareIcon,
    TableIcon,
    TextIcon,
    TriangleIcon,
} from '../../../../common/Icons/icons'
import {useContext, useEffect, useRef, useState} from 'react'
import {PresenterContext} from '../../../../presenterContext/PresenterContext'
import {useObjectCreation} from '../../../../hooks/useObjectCreation'

function AddBar() {
    const [imagePathInputOpened, setImagePathInputOpened] = useState(false)
    const imagePathInputRef = useRef(null)

    const {editedSlideRef} = useContext(PresenterContext)
    const [rect, setRect] = useState(editedSlideRef.current?.getBoundingClientRect())

    useEffect(() => {
        setRect(editedSlideRef.current?.getBoundingClientRect())
    }, []);

    const {handleAddDown, setBlockType, setImageValue} = useObjectCreation({rect})

    function handleDownInInput(event: MouseEvent) {
        if (event.target !== imagePathInputRef.current) {
            document.removeEventListener('mousedown', handleDownInInput)
            setImagePathInputOpened(false)
        }
    }

    const fileInputRef = useRef<HTMLInputElement>()
    return (
        <div className={styles.addBar}>
            <Button
                style='light'
                size='big'
                icon={TextIcon}
                text='text'
                onClick={() => {
                    setBlockType('text')
                    document.addEventListener('mousedown', handleAddDown)
                }}
            />
            <Button style='light' size='big' icon={TableIcon} text='table'/>
            <Button
                style='light'
                size='big'
                icon={TriangleIcon}
                text='triangle'
                onClick={() => {
                    setBlockType('triangle')
                    document.addEventListener('mousedown', handleAddDown)
                }}
            />
            <Button style='light' size='big' icon={BulletListIcon} text='bullet list'/>
            {!imagePathInputOpened && (
                <Button
                    style='light'
                    size='big'
                    icon={ImageIcon}
                    text='URL image'
                    onClick={() => {
                        setImagePathInputOpened(true)
                        document.addEventListener('mousedown', handleDownInInput)
                    }}
                />
            )}
            {imagePathInputOpened && (
                <input
                    className={styles.imagePathInput}
                    ref={imagePathInputRef}
                    placeholder={'URL to image'}
                    onChange={(e) => {
                        setImagePathInputOpened(false)
                        setBlockType('image')
                        setImageValue(e.target.value)
                        document.addEventListener('mousedown', handleAddDown)
                    }}
                />
            )}
            <Button
                style='light'
                size='big'
                icon={SquareIcon}
                text='rectangle'
                onClick={() => {
                    setBlockType('rectangle')
                    document.addEventListener('mousedown', handleAddDown)
                }}
            />
            <Button style='light' size='big' icon={NumberedListIcon} text='numbered list'/>
            <Button
                style='light'
                size='big'
                icon={ImageIcon}
                text='File image'
                onClick={() => {
                    fileInputRef.current.click()
                }}
            />
            <input type={"file"} hidden={true} ref={fileInputRef} onInput={() => {
                if (fileInputRef.current) {
                    let file = fileInputRef.current.files[0];

                    let reader = new FileReader();

                    reader.readAsDataURL(file);

                    reader.onload = () => {
                        if (typeof reader.result === "string") {
                            setBlockType('image')
                            setImageValue(reader.result)
                            document.addEventListener('mousedown', handleAddDown)
                        }
                    }

                    reader.onerror = () => {
                        console.log(reader.error)
                    }
                }
            }
            }/>
            <Button
                style='light'
                size='big'
                icon={OvalIcon}
                text='oval'
                onClick={() => {
                    setBlockType('oval')
                    document.addEventListener('mousedown', handleAddDown)
                }}
            />
        </div>
    )
}

export {AddBar}
