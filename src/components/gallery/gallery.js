import React from "react";
import * as styles from "./gallery.module.css";

export default function Gallery({ children }) {
  return (
    <div className={ styles.gallery }>
    { children } 
    </div>
  )
}