import React, { useState, useRef, useEffect } from "react";
import styles from './chips-item.module.scss';

export default function ChipsItem({  index, chip, input }) {
    const [item, setItem] = useState(chip)
    const [width, setWidth] = useState(0);
    const hideEl = useRef();

    const changeHandlerItem = (event) => {
        setItem(event.target.value)
    }

    useEffect(() => {
        setWidth(hideEl.current.offsetWidth)
      }, [item])

    return (
        <div className={styles.chip}>
            <span className={styles.hide_item} ref={hideEl}>{item}</span>
            <input type="text" 
            className={styles.item}
            value={item}
            onChange={changeHandlerItem}
            style={{ width: width + "px" }}
            />
            <span className={styles.remove}>&times;</span>
        </div>
    )
}
