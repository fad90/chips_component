import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./chips-item.module.scss";


export default React.memo(function ChipsItem({
  idx,
  chip,
  setChips,
  allChips,
  onChange,
  value,
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

  const removeChips = (indexToRemove) => {
    const before = allChips.slice(0, indexToRemove);
    const after = allChips.slice(indexToRemove + 1);
    const newArray = [...before, ...after];
    setChips(newArray);

    const valueToArr = value.split(",");
    const valueBefore = valueToArr.slice(0, indexToRemove);
    const valueAfter = valueToArr.slice(indexToRemove + 1);
    const valueArray = [...valueBefore, ...valueAfter];
    const newValue = valueArray.join();
    onChange(newValue);
  };

  const blurHandlerItem = (indexToSplit) => {
    const before = allChips.slice(0, indexToSplit);
    const after = allChips.slice(indexToSplit + 1);
    const splitElement = item.split(",");
    const newArray = [...before, ...splitElement, ...after];
    const filteredArray = newArray.filter((item) => item.length !== 0);
    setChips(filteredArray);

    const valueToArr = value.split(",");
    const valueBefore = valueToArr.slice(0, indexToSplit);
    const valueAfter = valueToArr.slice(indexToSplit + 1);
    const splitEl = item.split(",");
    const changeSplitEl = splitEl.map((item) => {
      return ` ${item}`;
    });
    const valueArray = [...valueBefore, ...changeSplitEl, ...valueAfter];
    const filteredValueArray = valueArray.filter((item) => item.length !== 0);
    const newValue = filteredValueArray.join();
    onChange(newValue);
  };

  return (
    <div className={styles.chip} ref={chipEl}>
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
