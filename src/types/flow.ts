import { Node as ReactFlowNode } from "@xyflow/react";

export interface FlowNode extends ReactFlowNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label?: string;
    value?: number;
    [key: string]: any;
  };
}
