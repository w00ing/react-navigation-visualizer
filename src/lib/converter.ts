import { NavigationFile } from "@/lib/navigationJson";
import { Edge } from "@xyflow/react";
import { FlowNode } from "@/types/flow";

export function convertNavigationJsonToFlow(json: NavigationFile[]): {
  nodes: FlowNode[];
  edges: Edge[];
} {
  const nodes: FlowNode[] = [];
  const edges: Edge[] = [];

  // We'll keep track of positions so that every new node
  // doesn't overlap visually. You can adjust these spacings.
  let currentX = 0;
  let currentY = 0;

  // Simple helper to move everything in columns
  const COLUMN_WIDTH = 350;
  const ROW_HEIGHT = 100;

  for (let fileIndex = 0; fileIndex < json.length; fileIndex++) {
    const fileObj = json[fileIndex];
    const { file, routeDefs } = fileObj;

    // For each file, we'll shift over in the x-direction
    // so you can see them in "columns".
    currentX = fileIndex * COLUMN_WIDTH;
    currentY = 0;

    for (const routeDef of routeDefs) {
      const { navigatorVar, navigatorType, screens = [] } = routeDef;

      // Create a node for the navigator itself
      // Make a unique ID to avoid collisions (e.g. "TrunkStack(navigations/TrunkStackNavigator.tsx)")
      const navigatorId = `${navigatorVar}(${file})`;

      nodes.push({
        id: navigatorId,
        // For demonstration, use "position-logger" if you want a custom node type
        // or "input"/"default"/"output" from React Flow/xyflow's built-ins.
        type: "position-logger",
        position: { x: currentX, y: currentY },
        data: {
          label: `Navigator: ${navigatorVar}\nFile: ${file}\nType: ${navigatorType}`,
        },
      } as FlowNode);

      currentY += ROW_HEIGHT; // move down for the next node

      // Add nodes for each screen, and create edges from the navigator node to each screen
      for (const screen of screens) {
        const { name, component } = screen;

        // Some screen names might look like "NavigatorName.MAIN_TAB".
        // We'll treat all of them as "screen nodes."
        const screenId = `${name}(${file})`;

        // Create a node for the screen
        nodes.push({
          id: screenId,
          type: "default", // or "position-logger", "input", "output", etc.
          position: { x: currentX + 50, y: currentY },
          data: {
            label: `Screen: ${name}\nComponent: ${component}`,
          },
        } as FlowNode);

        // Create an edge from the navigator to this screen
        edges.push({
          id: `${navigatorId}->${screenId}`,
          source: navigatorId,
          target: screenId,
        });

        currentY += ROW_HEIGHT;
      }

      // A little extra spacing before the next routeDef in the same file
      currentY += ROW_HEIGHT / 2;
    }
  }

  return { nodes, edges };
}
