import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/components/flow";

function App() {
  return (
    <div className="h-screen w-screen">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
