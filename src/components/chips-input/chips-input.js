import React, { useState, useRef } from "react";
import styles from "./chips-input.module.scss";
import ChipsItem from "../chips-item";

export default function ChipsInput({ value, onChange }) {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const [warning, setWarning] = useState(false);
  const spanEl = useRef(5);
  const inputEl = useRef(null);

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const blurHandler = () => {
    if (input.length !== 0) {
      if (input.split('"').length % 2 === 1) {
        setWarning(false);
        setChips([...chips, input]);
        setInput("");
      } else {
        setWarning(true);
      }
    }
  };

  const inputFocus = () => {
    inputEl.current?.focus();
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
    }
  };

  const placeholder =
    input.length === 0 && chips.length === 0 ? (
      <div className={styles.placeholder}>Введите ключевые слова</div>
    ) : null;

  const warningEl = warning ? (
    <div className={styles.warning}>Закройте кавычки с двух сторон</div>
  ) : null;

  return (
    <div className={styles.chips_input}>
      <div className={styles.wrapper} onClick={inputFocus}>
        {chips.map((chip, index) => (
          <ChipsItem key={index} chip={chip} input={input} />
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
