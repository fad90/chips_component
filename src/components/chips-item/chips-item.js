import React, { useState, useRef, useEffect } from "react";
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

  const valueBeforeAfter = (items, index) => {
    const valueToArr = items.split(",");
    const valueBefore = valueToArr.slice(0, index);
    const valueAfter = valueToArr.slice(index + 1);
    return { valueBefore, valueAfter };
  };

  const removeChips = (indexToRemove) => {
    const before = allChips.slice(0, indexToRemove);
    const after = allChips.slice(indexToRemove + 1);
    const newArray = [...before, ...after];
    setChips(newArray);

    const { valueBefore, valueAfter } = valueBeforeAfter(value, idx);
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

    const { valueBefore, valueAfter } = valueBeforeAfter(value, idx);
    const splitEl = item.split(",");
    const withoutEmpty = splitEl.filter((item) => item.length !== 0);
    const changeSplitEl = withoutEmpty.map((item) => {
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
