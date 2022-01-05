import React, { useState, useRef, useEffect } from "react";
import styles from './chips-item.module.scss';

export default function ChipsItem({ idx, chip, input, setChips, allChips }) {
    const [item, setItem] = useState(chip)
    const [width, setWidth] = useState(0);
    const hideEl = useRef();  

    const changeHandlerItem = (event) => {
        setItem(event.target.value)
    }

    useEffect(() => {
        setWidth(hideEl.current.offsetWidth)
      }, [item])

    
    const removeChips = (indexToRemove) => {
        const before = allChips.slice(0, indexToRemove);
        const after = allChips.slice(indexToRemove + 1);
        const newArray = [...before, ...after];
        setChips(newArray)
    }  


    const blurHandlerItem = (indexToSplit) => {
        const before = allChips.slice(0, indexToSplit);
        const after = allChips.slice(indexToSplit + 1);
        const splitElement = item.split(',');
        const newArray = [...before, ...splitElement, ...after]
        setChips(newArray)
    }
    
    
    return (
        <div className={styles.chip} >
            <span className={styles.hide_item} ref={hideEl}>{item}</span>
            <input type="text" 
            className={styles.item}
            value={item}
            onChange={changeHandlerItem}
            style={{ width: width + "px" }}
            onBlur={() => blurHandlerItem(idx)}
            />
            <span className={styles.remove} onClick={() => removeChips(idx)}>&times;</span>
        </div>
    )
}
