import React, { useState, useRef } from "react";
import styles from "./chips-input.module.scss";
import ChipsItem from "../chips-item";

export default function ChipsInput({ value, onChange }) {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const spanEl = useRef(5);
  const inputEl = useRef(null);

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const inputFocus = () => {
    inputEl.current?.focus();
  };

  const addChips = (event) => {
    if (event.key === ",") {
      event.preventDefault();
      setChips([...chips, event.target.value]);
      setInput("");
    }
  };
  return (
    <div className={styles.chips_input}>
      <div className={styles.wrapper} onClick={inputFocus}>
        {chips.map((chip, index) => (
          <ChipsItem 
          key={index} 
          chip={chip} 
          input={input}
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
            style={ input.length !== 0 ? { width: spanEl.current.offsetWidth + 14 + "px" } : { width: "2px" }}
            ref={inputEl}
            onKeyDown={addChips}
          />
        </div>
      </div>
    </div>
  );
}
