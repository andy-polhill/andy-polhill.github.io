import React, {useState, useEffect} from 'react';

import * as styles from "./footer.module.css";

export default function Footer({}) {
  const [date , setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear())
  useEffect(() => { getYear() }, [])

  return (
    <footer className={ styles.footer }>
      <small>&copy; Copyright {date}, Andy Polhill</small>
    </footer>
  )
}