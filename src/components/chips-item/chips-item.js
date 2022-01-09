import React, { useState, useRef, useEffect } from "react";
import styles from "./chips-item.module.scss";

export default React.memo(function ChipsItem({
  idx,
  chip,
  setChips,
  allChips,
  onChange,
  value,
  selecting,
  setSelecting,
  start,
  setStart,
  end,
  setEnd
}) {
  const [item, setItem] = useState(chip);
  const [width, setWidth] = useState(0);
  const hideEl = useRef();
  const chipEl = useRef();

  const changeHandlerItem = (event) => {
    setItem(event.target.value);
  };

  useEffect(() => {
    setWidth(hideEl.current.offsetWidth);
  }, [item]);

  
  const valueBeforeAfter = (items, index) => {
    const valueToArr = items.split(",");
    const valueBefore = valueToArr.slice(0, index);
    const valueAfter = valueToArr.slice(index + 1);
    return {valueBefore, valueAfter}
  }

  const removeChips = (indexToRemove) => {
    const before = allChips.slice(0, indexToRemove);
    const after = allChips.slice(indexToRemove + 1);
    const newArray = [...before, ...after];
    setChips(newArray);
    
    const {valueBefore, valueAfter} = valueBeforeAfter(value, idx)
    const valueArray = [...valueBefore, ...valueAfter];
    const newValue = valueArray.join();
    onChange(newValue);
  };

  const blurHandlerItem = (indexToSplit) => {
    const splitElement = item.split(",");
    const before = allChips.slice(0, indexToSplit);
    const after = allChips.slice(indexToSplit + 1);
    const newArray = [...before, ...splitElement, ...after];
    const filteredArray = newArray.filter((item) => item.length !== 0);
    setChips(filteredArray);

    const {valueBefore, valueAfter} = valueBeforeAfter(value, idx)
    const splitEl = item.split(",");
    const changeSplitEl = splitEl.map((item) => {
      return ` ${item}`;
    });
    const valueArray = [...valueBefore, ...changeSplitEl, ...valueAfter];
    const filteredValueArray = valueArray.filter((item) => item.length !== 0);
    const newValue = filteredValueArray.join();
    onChange(newValue);
  };

  let beginSelection = (i) => {
    setSelecting(true);
    setStart(i);
    updateSelection(i);
    console.log(`start: ${i}`);
  };

  let endSelection = (i = end) => {
    setSelecting(false);
    updateSelection(i);
    console.log(`end: ${i}`);
  };

  let updateSelection = (i) => {
    if (selecting) {
      setEnd(i);
      console.log(`update: ${i}`);
    }
  };

  return (
    <div
      className={
        ((end <= idx && idx <= start) || (start <= idx && idx <= end))
          ? `${styles.selected_chip}`
          : `${styles.chip}`
      }
      // className={styles.chip}
      ref={chipEl}
      onMouseDown={() => beginSelection(idx)}
      onMouseUp={() => endSelection(idx)}
      onMouseMove={() => updateSelection(idx)}
    >
      <span className={styles.hide_item} ref={hideEl}>
        {item}
      </span>
      <input
        type="text"
        className={styles.item}
        value={item}
        onChange={changeHandlerItem}
        style={{ width: width + "px" }}
        onBlur={() => blurHandlerItem(idx)}
      />
      <span className={styles.remove} onClick={() => removeChips(idx)}>
        &times;
      </span>
    </div>
  );
});
