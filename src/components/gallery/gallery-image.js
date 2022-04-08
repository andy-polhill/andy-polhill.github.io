import React from 'react';
import PropTypes from 'prop-types';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';


import * as styles from "./gallery.module.css";

export default function GalleryImage({ alt, caption, src }) {
  return (
    <figure className={ styles.galleryImage }>
      <GatsbyImage
            image={ getImage(src) }
            alt={ alt } />
      { caption && (
        <figcaption className={ styles.galleryCaption }>
          { caption }
        </figcaption>
      )}
    </figure>
  )
}

GalleryImage.propTypes = {
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  src: PropTypes.string.isRequired,
};
