import React from 'react';
import styles from './calculator.module.css';
export default function buttons(props) {
  return (
    <>
      <button id={styles.add} onClick={(e) => props.numberClicked(e)}>
        +
      </button>
      <button id={styles.subtract} onClick={(e) => props.numberClicked(e)}>
        -
      </button>
      <button id={styles.multiply} onClick={(e) => props.numberClicked(e)}>
        x
      </button>
      <button id={styles.divide} onClick={(e) => props.numberClicked(e)}>
        /
      </button>
      <button id={styles.seven} onClick={(e) => props.numberClicked(e)}>
        7
      </button>
      <button id={styles.eight} onClick={(e) => props.numberClicked(e)}>
        8
      </button>
      <button id={styles.nine} onClick={(e) => props.numberClicked(e)}>
        9
      </button>
      <button id={styles.four} onClick={(e) => props.numberClicked(e)}>
        4
      </button>
      <button id={styles.five} onClick={(e) => props.numberClicked(e)}>
        5
      </button>
      <button id={styles.six} onClick={(e) => props.numberClicked(e)}>
        6
      </button>
      <button id={styles.one} onClick={(e) => props.numberClicked(e)}>
        1
      </button>
      <button id={styles.two} onClick={(e) => props.numberClicked(e)}>
        2
      </button>
      <button id={styles.three} onClick={(e) => props.numberClicked(e)}>
        3
      </button>
      <button id={styles.zero} onClick={(e) => props.numberClicked(e)}>
        0
      </button>
      <button id={styles.decimal} onClick={(e) => props.numberClicked(e)}>
        .
      </button>
      <button id={styles.clear} onClick={(e) => props.numberClicked(e)}>
        ac
      </button>
      <button id={styles.equals} onClick={(e) => props.numberClicked(e)}>
        =
      </button>
    </>
  );
}
