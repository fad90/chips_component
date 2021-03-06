import React, { useState, useRef } from "react";
import styles from "./chips-input.module.scss";
import ChipsItem from "../chips-item";
import { useEffect } from "react/cjs/react.development";

export default function ChipsInput({ value, onChange }) {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const [warning, setWarning] = useState(false);

  const spanEl = useRef(0);
  const inputEl = useRef(null);
  const wrapperEl = useRef(null);
  const placeholderEl = useRef(null);

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const blurHandler = () => {
    if (input.length !== 0) {
      if (input.split('"').length % 2 === 1) {
        setWarning(false);
        setChips([...chips, input]);
        value ? onChange(`${value}, ${input}`) : onChange(input);
        setInput("");
      } else {
        setWarning(true);
      }
    }
  };

  const inputFocus = (event) => {
    if (
      event.target === wrapperEl.current ||
      event.target === placeholderEl.current
    ) {
      inputEl.current?.focus();
    }
  };

  const addChips = (event) => {
    if (event.key === "," && input.split('"').length % 2 === 1) {
      if (input.length === 0) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      setChips([...chips, event.target.value]);
      setInput("");
      setWarning(false);
      value
        ? onChange(`${value}, ${event.target.value}`)
        : onChange(event.target.value);
    } else if (event.key === "Backspace") {
      if (input.length === 0) {
        setChips(chips.slice(0, chips.length - 1));
        const valueToArr = value.split(",");
        const newValueArr = valueToArr.slice(0, valueToArr.length - 1);
        const newValue = newValueArr.join();
        onChange(newValue);
      }
    }
  };

  const placeholder =
    input.length === 0 && chips.length === 0 ? (
      <div className={styles.placeholder} ref={placeholderEl}>
        Введите ключевые слова
      </div>
    ) : null;

  const warningEl = warning ? (
    <div className={styles.warning}>Закройте кавычки с двух сторон</div>
  ) : null;

  return (
    <div className={styles.chips_input}>
      <div className={styles.wrapper} onClick={inputFocus} ref={wrapperEl}>
        {chips.map((chip, index) => (
          <ChipsItem
            key={chip + index}
            chip={chip}
            setChips={setChips}
            allChips={chips}
            idx={index}
            onChange={onChange}
            value={value}
          />
        ))}
        <div className={styles.container}>
          <span className={styles.hide_el} ref={spanEl}>
            {input}
          </span>
          <input
            type="text"
            className={styles.input}
            value={input}
            onChange={changeHandler}
            onBlur={blurHandler}
            style={
              input.length !== 0
                ? { width: spanEl.current.offsetWidth + 14 + "px" }
                : { width: "2px" }
            }
            ref={inputEl}
            onKeyDown={addChips}
          />
        </div>
        {placeholder}
      </div>
      {warningEl}
    </div>
  );
}
