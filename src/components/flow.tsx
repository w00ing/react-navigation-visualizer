import {
  ReactFlow,
  OnConnect,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Node,
  Edge,
} from "@xyflow/react";

import { NumNode } from "@/components/nodes/num-node";
import { SumNode } from "@/components/nodes/sum-node";

import { DataEdge } from "@/components/data-edge";
import { useCallback } from "react";
import { FlowNode } from "@/types/flow";

const nodeTypes = {
  num: NumNode,
  sum: SumNode,
  "position-logger": BaseNode,
  default: BaseNode,
} as const;
const edgeTypes = {
  data: DataEdge,
};

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "@/navigationTree_20250212_124019.json";
import { BaseNode } from "@/components/base-node";

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  return { nodes, edges };
};
const Flow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onLayout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges);

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [nodes, edges, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      // onLayout={onLayout}
      fitView
    />
  );
};

export default Flow;
