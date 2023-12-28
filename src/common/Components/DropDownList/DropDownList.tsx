import styles from './DropDownList.css'
import {useState} from "react";

type choiceInfo = {
    name: string
    returnValue: any
}

type DropDownListProps = {
    header: string
    choices: choiceInfo[]
    onChoice: (type: any) => void
}

function DropDownList({choices, header, onChoice}: DropDownListProps) {
    const [pickerOpened, setPickerOpened] = useState(false)
    return (
        <div className={styles.selector}>
			<span className={styles.button} onClick={() => setPickerOpened(!pickerOpened)}>
				{header}
			</span>
            {
                pickerOpened &&
                (
                    <div className={styles.list}>
                        {choices.map(choice => <div className={styles.choice} key={choice.name} onClick={() => onChoice(choice.returnValue)}>{choice.name}</div>)}
                    </div>
                )
            }
        </div>
    )
}
export {DropDownList}
