import React, { useState, useRef } from "react";
import styles from './chips-item.module.scss';

export default function ChipsItem({  index, chip, input }) {
    const [item, setItem] = useState(chip)
    const hideEl = useRef(5);

    const changeHandlerItem = (event) => {
        setItem(event.target.value)
    }

    return (
        <div className={styles.chip}>
            <span className={styles.hide_item} ref={hideEl}>{item}</span>
            <input type="text" 
            className={styles.item}
            value={item}
            onChange={changeHandlerItem}
            style={{ width: hideEl.current.offsetWidth + 8 + "px" }}
            />
            <span className={styles.remove}>&times;</span>
        </div>
    )
}
