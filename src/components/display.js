import React from 'react';
import styles from './display.module.css';

export default function Display(props) {
  return (
    <div id={styles.display}>
      <span>{props.total}</span>
    </div>
  );
}
