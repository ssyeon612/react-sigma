import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph as MultiGraphConstructor } from "graphology";
import { CSSProperties, FC, useEffect, useMemo } from "react";
import EdgeCurveProgram, { DEFAULT_EDGE_CURVATURE, indexParallelEdgesIndex } from "@sigma/edge-curve";
import { EdgeArrowProgram } from "sigma/rendering";

interface NodeType {
  x: number;
  y: number;
  label: string;
  size: number;
  color: string;
}

interface EdgeType {
  type?: string;
  label?: string;
  size?: number;
  curvature?: number;
  parallelIndex?: number;
  parallelMaxIndex?: number;
}

const MyGraph: FC = () => {
  const loadGraph = useLoadGraph<NodeType, EdgeType>();

  useEffect(() => {
    const graph = new MultiGraphConstructor<NodeType, EdgeType>();
    graph.addNode("a", { x: 0, y: 0, size: 10, color: "red", label: "jeong" });
    graph.addNode("b", { x: 1, y: -1, size: 10, color: "yellow", label: "park" });
    graph.addNode("c", { x: 3, y: -2, size: 10, color: "green", label: "kim" });
    graph.addNode("d", { x: 1, y: -3, size: 10, color: "blue", label: "lee" });
    graph.addNode("e", { x: 3, y: -4, size: 10, color: "orange", label: "sin" });
    graph.addNode("f", { x: 4, y: -5, size: 10, color: "grey", label: "kang" });
    graph.addEdge("a", "b", { label: new Date().toISOString(), size: 3 });
    graph.addEdge("b", "c", { label: new Date().toISOString(), size: 2 });
    graph.addEdge("b", "d", { label: new Date().toISOString(), size: 1 });
    graph.addEdge("c", "b", { label: new Date().toISOString(), size: 2 });
    graph.addEdge("c", "e", { label: new Date().toISOString(), size: 5 });
    graph.addEdge("d", "e", { label: new Date().toISOString(), size: 2 });
    graph.addEdge("e", "f", { label: new Date().toISOString(), size: 5 });

    indexParallelEdgesIndex(graph, {
      edgeIndexAttribute: "parallelIndex",
      edgeMaxIndexAttribute: "edgeMaxIndexAttribute",
    });

    graph.forEachEdge((edge, { parallelIndex, parallelMaxIndex }) => {
      if (typeof parallelIndex === "number") {
        graph.mergeEdgeAttributes(edge, {
          type: "curved",
          curvature: DEFAULT_EDGE_CURVATURE + (3 * DEFAULT_EDGE_CURVATURE * parallelIndex) / (parallelMaxIndex || 1),
        });
      } else {
        graph.setEdgeAttribute(edge, "type", "straight");
      }
    });
    loadGraph(graph);
  }, [loadGraph]);
  return null;
};

export const CustomGraph: FC<{ style?: CSSProperties }> = ({ style }) => {
  const settings = useMemo(
    () => ({
      allowInvalidContainer: true,
      renderEdgeLabels: true,
      defaultEdgeType: "straight",
      edgeProgramClasses: {
        straight: EdgeArrowProgram,
        curved: EdgeCurveProgram,
      },
    }),
    []
  );
  return (
    <SigmaContainer
      style={{ width: "800px", height: "1000px" }}
      graph={MultiGraphConstructor<NodeType, EdgeType>}
      settings={settings}
    >
      <MyGraph />
    </SigmaContainer>
  );
};

export default CustomGraph;
