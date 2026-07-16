import { GitBranch } from "lucide-react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

import RoadmapNode from "./roadmap/RoadmapNode";
import roadmapNodes from "./roadmap/roadmapNodes";
import roadmapEdges from "./roadmap/roadmapEdges";

const nodeTypes = {
  roadmap: RoadmapNode,
};

export default function EngineeringRoadmap() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/90
        p-6
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/10
          "
        >
          <GitBranch
            size={20}
            className="text-blue-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            Engineering Roadmap
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Structured learning journey towards becoming a Modern Data Engineer
          </p>

        </div>

      </div>

      {/* Legend */}

      <div className="mt-6 flex flex-wrap gap-5 text-sm">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-emerald-500" />

          <span className="text-slate-300">
            Completed
          </span>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-blue-500" />

          <span className="text-slate-300">
            In Progress
          </span>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-slate-500" />

          <span className="text-slate-300">
            Planned
          </span>

        </div>

      </div>

      {/* React Flow */}

      <div
        className="
          mt-8
          h-[900px]
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-[#09090B]
        "
      >
        <ReactFlow
          nodes={roadmapNodes}
          edges={roadmapEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{
            padding: 0.25,
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          proOptions={{
            hideAttribution: true,
          }}
        >
          <Background
            color="#27272A"
            gap={24}
            size={1}
          />

          <MiniMap
            pannable
            zoomable
            nodeStrokeColor="#3b82f6"
            nodeColor="#18181b"
            maskColor="rgba(0,0,0,.65)"
            style={{
              background: "#111113",
              border: "1px solid #27272A",
            }}
          />

          <Controls
            showInteractive={false}
            position="bottom-right"
          />

        </ReactFlow>
      </div>

      {/* Footer */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-slate-800
          bg-slate-950/60
          px-5
          py-4
        "
      >
        <p className="text-sm leading-7 text-slate-400">
          This roadmap represents my structured learning journey through
          Modern Data Engineering, following a hands-on approach focused on
          building production-ready data platforms, cloud-native data
          pipelines, and scalable analytics solutions.
        </p>
      </div>
    </section>
  );
}