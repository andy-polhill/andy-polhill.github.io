import React from 'react';

import * as styles from "./gallery.module.css";

export default function GalleryCaption({ href, children }) {
  return (
    <div className={ styles.galleryCaption }>
      { href && (
        <a href={ href } target="_blank">
        </a>
      ) }
      { !href && ( <span>{ children }</span> ) }
    </div>
  )
}

GalleryImage.propTypes = {
  href: PropTypes.string.isRequired,
};
