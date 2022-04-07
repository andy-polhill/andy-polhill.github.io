import React from 'react';
import PropTypes from 'prop-types';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';


import * as styles from "./gallery.module.css";

export default function GalleryImage({ alt, src }) {
  return (
    <div className={ styles.galleryImage }>
      <GatsbyImage
            image={ getImage(src) }
            alt={ alt } />
    </div>
  )
}

GalleryImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
