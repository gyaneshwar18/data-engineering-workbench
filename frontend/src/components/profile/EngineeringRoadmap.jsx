// src/components/profile/EngineeringRoadmap.jsx

import React from "react";
import {
  Code2,
  Cpu,
  Cloud,
  Rocket,
} from "lucide-react";

import {
  ReactFlow,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import RoadmapSection from "./roadmap/RoadmapSection";
import RoadmapNode from "./roadmap/RoadmapNode";

import {
  foundationNodes,
  foundationEdges,
  engineeringNodes,
  engineeringEdges,
  azureNodes,
  azureEdges,
  productionNodes,
  productionEdges,
} from "./roadmap/roadmapData";

const nodeTypes = {
  roadmap: RoadmapNode,
};

const flowOptions = {
  fitView: true,
  fitViewOptions: {
    padding: 0.25,
  },
  nodesDraggable: false,
  nodesConnectable: false,
  elementsSelectable: false,
  zoomOnScroll: false,
  panOnDrag: true,
  proOptions: { hideAttribution: true },
};

export default function EngineeringRoadmap() {
  return (
    <div className="space-y-10">

      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold text-white">
          My Learning Journey
        </h2>

        <p className="mt-2 text-slate-400">
          Road to Modern Data Engineering • Azure Data Platform
        </p>
      </div>

      {/* ================= FOUNDATION ================= */}

      <RoadmapSection
        icon={Code2}
        title="Foundation"
        subtitle="Core Programming & Database Fundamentals"
      >
        <div className="h-[250px] w-full">
          <ReactFlow
            {...flowOptions}
            nodes={foundationNodes}
            edges={foundationEdges}
            nodeTypes={nodeTypes}
          >
            <Background
              gap={24}
              size={1}
              color="#334155"
            />

            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </RoadmapSection>

      {/* Arrow */}

      <div className="flex justify-center">
        <div className="rounded-full border border-slate-700 bg-slate-900 p-3">
          <svg
            className="h-6 w-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m0 0l-6-6m6 6l6-6"
            />
          </svg>
        </div>
      </div>

      {/* ================= DATA ENGINEERING ================= */}

      <RoadmapSection
        icon={Cpu}
        title="Data Engineering"
        subtitle="Building Reliable Data Pipelines"
      >
        <div className="h-[250px] w-full">
          <ReactFlow
            {...flowOptions}
            nodes={engineeringNodes}
            edges={engineeringEdges}
            nodeTypes={nodeTypes}
          >
            <Background
              gap={24}
              size={1}
              color="#334155"
            />

            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </RoadmapSection>
      {/* Arrow */}

      <div className="flex justify-center">
        <div className="rounded-full border border-slate-700 bg-slate-900 p-3">
          <svg
            className="h-6 w-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m0 0l-6-6m6 6l6-6"
            />
          </svg>
        </div>
      </div>

      {/* ================= AZURE PLATFORM ================= */}

      <RoadmapSection
        icon={Cloud}
        title="Azure Platform"
        subtitle="Cloud-native Data Engineering Services"
      >
        <div className="h-[250px] w-full">
          <ReactFlow
            {...flowOptions}
            nodes={azureNodes}
            edges={azureEdges}
            nodeTypes={nodeTypes}
          >
            <Background
              gap={24}
              size={1}
              color="#334155"
            />

            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </RoadmapSection>

      {/* Arrow */}

      <div className="flex justify-center">
        <div className="rounded-full border border-slate-700 bg-slate-900 p-3">
          <svg
            className="h-6 w-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m0 0l-6-6m6 6l6-6"
            />
          </svg>
        </div>
      </div>

      {/* ================= PRODUCTION ================= */}

      <RoadmapSection
        icon={Rocket}
        title="Production Engineering"
        subtitle="Deployment, Streaming & Enterprise Data Platform"
      >
        <div className="h-[250px] w-full">
          <ReactFlow
            {...flowOptions}
            nodes={productionNodes}
            edges={productionEdges}
            nodeTypes={nodeTypes}
          >
            <Background
              gap={24}
              size={1}
              color="#334155"
            />

            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </RoadmapSection>

    </div>
  );
}