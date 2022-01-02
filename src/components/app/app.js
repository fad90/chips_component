import React from "react";
import { useState } from "react";
import styles from "./app.module.scss";
import ChipsInput from "../chips-input";

export default function App() {
  const [value, setValue] = useState("");
  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <ChipsInput value={value} onChange={setValue} />
      </div>
      <div>Строковое представление: {value}</div>
    </div>
  );
}
