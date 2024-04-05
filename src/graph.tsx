import { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";

const sigmaStyle = { height: "500px", width: "500px" };

// load graph
export const LoadGraph = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.addNode("first", { x: 0, y: 0, size: 15, label: "My First node", color: "#FA4F40" });
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

// display graph
export const DisplayGraph = () => {
  return (
    <SigmaContainer style={sigmaStyle}>
      <LoadGraph />
    </SigmaContainer>
  );
};

export default DisplayGraph;
