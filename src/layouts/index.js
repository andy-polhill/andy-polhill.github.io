import React, { Fragment } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import SEO from "../components/seo/seo";
import Hero from "../components/hero/hero";

export default function Layout({ children }) {

  return (
    <Fragment>
      <SEO />
      <Header />
      <Hero />
      { children }
      <Footer />
    </Fragment>
  );
}
