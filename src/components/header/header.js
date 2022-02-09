import { Link } from "gatsby";
import React from "react";
import LinkedInIcon from "../icon/linkedin";
import TwitterIcon from "../icon/twitter";
import * as styles from "./header.module.css";

export default function Header({}) {
  return (
    <header className={ styles.header }>
      <nav className={ styles.nav }>
        <ul className={ styles.navList }>
          <li className={ styles.navItem }>
            <Link to="/">
              Home
            </Link>
          </li>
          <li className={ styles.navItem }>
            <Link to="/blog">
              Blog
            </Link>
          </li>
          <li className={` ${styles.navItem} ${styles.socialIcons}` }>
            <a href="https://twitter.com/andy-polhill" target="_blank">
              <TwitterIcon />
            </a>
            <a href="https://linkedin.com/in/andy-polhill" target="_blank">
              <LinkedInIcon />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}