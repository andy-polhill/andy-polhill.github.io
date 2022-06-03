import React, { useEffect } from "react";
import { forceSimulation } from "d3-force";

import * as styles from "./network.module.css";

export default function Network({ children }) {

  const nodes = [{id: 'EM'}, {id: 'IC1'}, {id: 'IC1'}, {id: 'IC1'}, {id: 'IC1'}, {id: 'IC1'}]
  const edges = [
    { source: 'EM', target: 'IC1', value: 1 },
    { source: 'EM', target: 'IC2', value: 1 },
    { source: 'EM', target: 'IC3', value: 1 },
    { source: 'EM', target: 'IC4', value: 1 },
    { source: 'EM', target: 'IC5', value: 1 },
  ]

  useEffect((nodes, edges) => {
    const simulation = forceSimulation(nodes);
    console.log(simulation);

    return () => {
      // Clean up the subscription
    };
  }, [nodes, edges]);


  return (
    <div className={ styles.network }>
      { children }
    </div>
  )
}
