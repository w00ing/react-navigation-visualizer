import "@xyflow/react/dist/style.css";

import {
  ReactFlow,
  OnConnect,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Node,
} from "@xyflow/react";

import { NumNode } from "@/components/nodes/num-node";
import { SumNode } from "@/components/nodes/sum-node";
import { BaseNode } from "@/components/nodes/base-node";

import { DataEdge } from "@/components/data-edge";
import { useCallback } from "react";
import { convertNavigationJsonToFlow } from "@/lib/converter";
import navigationJson from "@/lib/navigationJson";
import { FlowNode } from "@/types/flow";

const nodeTypes = {
  num: NumNode,
  sum: SumNode,
  "position-logger": BaseNode,
  default: BaseNode,
} as const;

// const initialNodes: Node[] = [
//   { id: "a", type: "num", data: { value: 0 }, position: { x: 0, y: 0 } },
//   { id: "b", type: "num", data: { value: 0 }, position: { x: 0, y: 200 } },
//   { id: "c", type: "sum", data: { value: 0 }, position: { x: 300, y: 100 } },
//   { id: "d", type: "num", data: { value: 0 }, position: { x: 0, y: 400 } },
//   { id: "e", type: "sum", data: { value: 0 }, position: { x: 600, y: 400 } },
// ];

const edgeTypes = {
  data: DataEdge,
};

// const initialEdges: Edge[] = [
//   {
//     id: "a->c",
//     type: "data",
//     data: { key: "value" },
//     source: "a",
//     target: "c",
//     targetHandle: "x",
//   },
//   {
//     id: "b->c",
//     type: "data",
//     data: { key: "value" },
//     source: "b",
//     target: "c",
//     targetHandle: "y",
//   },
//   {
//     id: "c->e",
//     type: "data",
//     data: { key: "value" },
//     source: "c",
//     target: "e",
//     targetHandle: "x",
//   },
//   {
//     id: "d->e",
//     type: "data",
//     data: { key: "value" },
//     source: "d",
//     target: "e",
//     targetHandle: "y",
//   },
// ];

const { nodes: initialNodes, edges: initialEdges } =
  convertNavigationJsonToFlow(navigationJson);

function App() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<FlowNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    params => {
      setEdges(edges =>
        addEdge({ type: "data", data: { key: "value" }, ...params }, edges),
      );
    },
    [setEdges],
  );

  return (
    <div className="h-screen w-screen p-8">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      />
    </div>
  );
}

export default App;
