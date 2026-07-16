import { MarkerType } from "reactflow";

const x = 100;
const gap = 170;

const roadmapNodes = [
  {
    id: "python",
    type: "roadmap",
    position: { x, y: 0 },
    data: {
      title: "Python",
      description:
        "Core programming, automation and scripting.",
      status: "completed",
      level: "Foundation",
    },
  },

  {
    id: "sql",
    type: "roadmap",
    position: { x, y: gap },
    data: {
      title: "SQL",
      description:
        "Queries, joins, aggregations and optimization.",
      status: "completed",
      level: "Foundation",
    },
  },

  {
    id: "postgresql",
    type: "roadmap",
    position: { x, y: gap * 2 },
    data: {
      title: "PostgreSQL",
      description:
        "Database design, indexing and data modeling.",
      status: "completed",
      level: "Foundation",
    },
  },

  {
    id: "warehouse",
    type: "roadmap",
    position: { x, y: gap * 3 },
    data: {
      title: "Data Warehousing",
      description:
        "Dimensional modeling and warehouse concepts.",
      status: "completed",
      level: "Foundation",
    },
  },

  {
    id: "etl",
    type: "roadmap",
    position: { x, y: gap * 4 },
    data: {
      title: "ETL Pipelines",
      description:
        "Extraction, transformation and loading workflows.",
      status: "completed",
      level: "Foundation",
    },
  },

  {
    id: "airflow",
    type: "roadmap",
    position: { x, y: gap * 5 },
    data: {
      title: "Apache Airflow",
      description:
        "Pipeline orchestration and scheduling.",
      status: "completed",
      level: "Intermediate",
    },
  },

  {
    id: "pyspark",
    type: "roadmap",
    position: { x, y: gap * 6 },
    data: {
      title: "PySpark",
      description:
        "Distributed data processing with Spark.",
      status: "completed",
      level: "Intermediate",
    },
  },

  {
    id: "delta",
    type: "roadmap",
    position: { x, y: gap * 7 },
    data: {
      title: "Delta Lake",
      description:
        "Lakehouse architecture and ACID transactions.",
      status: "current",
      level: "Intermediate",
    },
  },

  {
    id: "adls",
    type: "roadmap",
    position: { x, y: gap * 8 },
    data: {
      title: "Azure Data Lake",
      description:
        "Cloud storage for analytical workloads.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "adf",
    type: "roadmap",
    position: { x, y: gap * 9 },
    data: {
      title: "Azure Data Factory",
      description:
        "Cloud ETL orchestration service.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "databricks",
    type: "roadmap",
    position: { x, y: gap * 10 },
    data: {
      title: "Azure Databricks",
      description:
        "Spark engineering on Azure.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "synapse",
    type: "roadmap",
    position: { x, y: gap * 11 },
    data: {
      title: "Azure Synapse",
      description:
        "Enterprise analytics platform.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "azure-sql",
    type: "roadmap",
    position: { x, y: gap * 12 },
    data: {
      title: "Azure SQL",
      description:
        "Managed relational database services.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "devops",
    type: "roadmap",
    position: { x, y: gap * 13 },
    data: {
      title: "Azure DevOps",
      description:
        "CI/CD and deployment automation.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "kafka",
    type: "roadmap",
    position: { x, y: gap * 14 },
    data: {
      title: "Apache Kafka",
      description:
        "Streaming data pipelines.",
      status: "planned",
      level: "Advanced",
    },
  },

  {
    id: "production",
    type: "roadmap",
    position: { x, y: gap * 15 },
    data: {
      title: "Production Platform",
      description:
        "End-to-end Modern Data Engineering ecosystem.",
      status: "planned",
      level: "Expert",
    },
  },
];

export default roadmapNodes;