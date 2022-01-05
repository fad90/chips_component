import React, { useState, useRef } from "react";
import styles from "./chips-input.module.scss";
import ChipsItem from "../chips-item";
import { useEffect } from "react/cjs/react.development";

export default function ChipsInput({ value, onChange }) {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const [warning, setWarning] = useState(false);
  const spanEl = useRef(5);
  const inputEl = useRef(null);
  const wrapperEl = useRef(null);
  const placeholderEl = useRef(null);


  useEffect(() => {
    setChips(chips)
  }, [chips])

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

  const inputFocus = (event) => {
    if(event.target === wrapperEl.current || event.target === placeholderEl.current) {
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
    } else if (event.key === "Backspace") {
      // chips.splice(chips.length-1, 1)
      if(input.length === 0)
      setChips(chips.slice(0, chips.length-1))
    }
  };

  const placeholder =
    input.length === 0 && chips.length === 0 ? (
      <div className={styles.placeholder} ref={placeholderEl}>Введите ключевые слова</div>
    ) : null;

  const warningEl = warning ? (
    <div className={styles.warning}>Закройте кавычки с двух сторон</div>
  ) : null;

  
  return (
    <div className={styles.chips_input}>
      <div className={styles.wrapper} onClick={inputFocus} ref={wrapperEl}>
        {chips.map((chip, index) => (
          <ChipsItem key={new Date().getTime() + index}
                     chip={chip} 
                     input={input}
                     setChips={setChips} 
                     allChips={chips}
                     idx={index}
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
