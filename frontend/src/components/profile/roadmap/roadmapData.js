import {
  Code2,
  Database,
  Server,
  Warehouse,
  GitBranch,
  Workflow,
  Sparkles,
  Layers3,
  Cloud,
  Factory,
  Blocks,
  Network,
  Rocket,
  Radio,
  Trophy,
} from "lucide-react";

/* ===========================
   FOUNDATION
=========================== */

export const foundationNodes = [
  {
    id: "python",
    type: "roadmap",
    position: { x: 0, y: 0 },
    data: {
      title: "Python",
      subtitle: "Programming Fundamentals",
      status: "completed",
      icon: Code2,
    },
  },
  {
    id: "sql",
    type: "roadmap",
    position: { x: 280, y: 0 },
    data: {
      title: "SQL",
      subtitle: "Query Processing",
      status: "completed",
      icon: Database,
    },
  },
  {
    id: "postgres",
    type: "roadmap",
    position: { x: 560, y: 0 },
    data: {
      title: "PostgreSQL",
      subtitle: "Relational Database",
      status: "completed",
      icon: Server,
    },
  },
  {
    id: "warehouse",
    type: "roadmap",
    position: { x: 840, y: 0 },
    data: {
      title: "Data Warehouse",
      subtitle: "Data Modeling",
      status: "completed",
      icon: Warehouse,
    },
  },
];

export const foundationEdges = [
  {
    id: "e1",
    source: "python",
    target: "sql",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e2",
    source: "sql",
    target: "postgres",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e3",
    source: "postgres",
    target: "warehouse",
    animated: true,
    type: "smoothstep",
  },
];

/* ===========================
   DATA ENGINEERING
=========================== */

export const engineeringNodes = [
  {
    id: "etl",
    type: "roadmap",
    position: { x: 0, y: 0 },
    data: {
      title: "ETL Pipelines",
      subtitle: "Data Integration",
      status: "completed",
      icon: GitBranch,
    },
  },
  {
    id: "airflow",
    type: "roadmap",
    position: { x: 280, y: 0 },
    data: {
      title: "Apache Airflow",
      subtitle: "Workflow Orchestration",
      status: "completed",
      icon: Workflow,
    },
  },
  {
    id: "spark",
    type: "roadmap",
    position: { x: 560, y: 0 },
    data: {
      title: "PySpark",
      subtitle: "Distributed Computing",
      status: "completed",
      icon: Sparkles,
    },
  },
  {
    id: "delta",
    type: "roadmap",
    position: { x: 840, y: 0 },
    data: {
      title: "Delta Lake",
      subtitle: "Lakehouse Storage",
      status: "current",
      icon: Layers3,
    },
  },
];

export const engineeringEdges = [
  {
    id: "e4",
    source: "etl",
    target: "airflow",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e5",
    source: "airflow",
    target: "spark",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e6",
    source: "spark",
    target: "delta",
    animated: true,
    type: "smoothstep",
  },
];

/* ===========================
   AZURE
=========================== */

export const azureNodes = [
  {
    id: "adls",
    type: "roadmap",
    position: { x: 0, y: 0 },
    data: {
      title: "Azure Data Lake",
      subtitle: "Cloud Storage",
      status: "planned",
      icon: Cloud,
    },
  },
  {
    id: "adf",
    type: "roadmap",
    position: { x: 280, y: 0 },
    data: {
      title: "Azure Data Factory",
      subtitle: "Pipeline Automation",
      status: "planned",
      icon: Factory,
    },
  },
  {
    id: "dbx",
    type: "roadmap",
    position: { x: 560, y: 0 },
    data: {
      title: "Azure Databricks",
      subtitle: "Unified Analytics",
      status: "planned",
      icon: Blocks,
    },
  },
  {
    id: "synapse",
    type: "roadmap",
    position: { x: 840, y: 0 },
    data: {
      title: "Azure Synapse",
      subtitle: "Enterprise Analytics",
      status: "planned",
      icon: Network,
    },
  },
];

export const azureEdges = [
  {
    id: "e7",
    source: "adls",
    target: "adf",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e8",
    source: "adf",
    target: "dbx",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e9",
    source: "dbx",
    target: "synapse",
    animated: true,
    type: "smoothstep",
  },
];

/* ===========================
   PRODUCTION
=========================== */

export const productionNodes = [
  {
    id: "devops",
    type: "roadmap",
    position: { x: 0, y: 0 },
    data: {
      title: "Azure DevOps",
      subtitle: "CI/CD & Deployment",
      status: "planned",
      icon: Rocket,
    },
  },
  {
    id: "kafka",
    type: "roadmap",
    position: { x: 360, y: 0 },
    data: {
      title: "Apache Kafka",
      subtitle: "Event Streaming",
      status: "planned",
      icon: Radio,
    },
  },
  {
    id: "platform",
    type: "roadmap",
    position: { x: 720, y: 0 },
    data: {
      title: "Production Platform",
      subtitle: "Modern Data Engineering",
      status: "planned",
      icon: Trophy,
    },
  },
];

export const productionEdges = [
  {
    id: "e10",
    source: "devops",
    target: "kafka",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e11",
    source: "kafka",
    target: "platform",
    animated: true,
    type: "smoothstep",
  },
];