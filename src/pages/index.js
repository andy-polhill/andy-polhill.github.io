import React, { Fragment } from "react";
import Page from "../components/page";
import Hero from "../components/hero/hero";
import About from "../components/about/about";

export default function Home() {
  return (
     <Page>
       <Hero />
       <About />
     </Page>
  );
}
