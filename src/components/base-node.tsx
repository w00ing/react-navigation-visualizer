import React from "react";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const BaseNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md border bg-card p-5 text-card-foreground font-mono font-bold",
      className,
      selected ? "border-muted-foreground shadow-lg" : "",
      "hover:ring-1",
    )}
    tabIndex={0}
    {...props}
  ></div>
));
BaseNode.displayName = "BaseNode";

export function BaseNodeCard({ data }: { data: { label: string } }) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-sm">{data.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </CardContent>
    </Card>
  );
}
