import {DropDownList} from "../DropDownList/DropDownList";
import styles from './FontFamilySelection.css'

// type FontFamilySelectionProps = {
//     choices: string[];
// }

function FontFamilySelection() {
    return (
        <div className={styles.selectionField}>
            <DropDownList choices={[
                {
                    name: 'HELLO',
                    returnValue: 1,
                },
                {
                    name: 'WOW',
                    returnValue: 2,
                },
                {
                    name: 'HO-HO-Ho',
                    returnValue: 3,
                }
            ]} header={'chose font'} onChoice={font => {
                console.log(font)
            }}/>
        </div>
    )
}

export {FontFamilySelection}
