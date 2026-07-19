const roadmapData = [
  {
    id: "foundation",
    title: "Foundation",
    subtitle: "Core programming & database fundamentals",
    icon: "🧩",
    technologies: [
      {
        id: "python",
        name: "Python",
        description: "Programming",
        logo: "/logos/python.svg",
        status: "Completed",
      },
      {
        id: "sql",
        name: "SQL",
        description: "Query Processing",
        logo: "/logos/sql.svg",
        status: "Completed",
      },
      {
        id: "postgresql",
        name: "PostgreSQL",
        description: "Relational Database",
        logo: "/logos/postgresql.svg",
        status: "Completed",
      },
      {
        id: "warehouse",
        name: "Warehouse",
        description: "Data Warehousing",
        logo: "/logos/warehouse.svg",
        status: "Completed",
      },
    ],
  },

  {
    id: "data-engineering",
    title: "Data Engineering",
    subtitle: "Building scalable ETL & batch pipelines",
    icon: "⚙️",
    technologies: [
      {
        id: "etl",
        name: "ETL",
        description: "Pipeline Design",
        logo: "/logos/etl.svg",
        status: "Completed",
      },
      {
        id: "airflow",
        name: "Airflow",
        description: "Workflow Engine",
        logo: "/logos/airflow.svg",
        status: "Completed",
      },
      {
        id: "spark",
        name: "Spark",
        description: "Distributed Data",
        logo: "/logos/spark.svg",
        status: "Inprogress",
      },
      {
        id: "delta",
        name: "Delta Lake",
        description: "Lakehouse Storage",
        logo: "/logos/delta.svg",
        status: "Planned",
      },
    ],
  },

  {
    id: "azure-platform",
    title: "Azure Platform",
    subtitle: "Modern cloud data platform",
    icon: "☁️",
    technologies: [
      {
        id: "adls",
        name: "ADLS",
        description: "Data Lake Storage",
        logo: "/logos/adls.svg",
        status: "Planned",
      },
      {
        id: "adf",
        name: "Data Factory",
        description: "Pipeline Service",
        logo: "/logos/adf.svg",
        status: "Planned",
      },
      {
        id: "databricks",
        name: "Databricks",
        description: "Lakehouse Compute",
        logo: "/logos/databricks.svg",
        status: "Planned",
      },
      {
        id: "synapse",
        name: "Synapse",
        description: "Analytics Platform",
        logo: "/logos/synapse.svg",
        status: "Planned",
      },
    ],
  },

  {
    id: "production-engineering",
    title: "Production Engineering",
    subtitle: "Deployment, streaming & production systems",
    icon: "🚀",
    technologies: [
      {
        id: "devops",
        name: "Azure DevOps",
        description: "CI / CD",
        logo: "/logos/devops.svg",
        status: "Planned",
      },
      {
        id: "kafka",
        name: "Kafka",
        description: "Event Streaming",
        logo: "/logos/kafka.svg",
        status: "Planned",
      },
      {
        id: "production",
        name: "Production",
        description: "Monitoring & Scaling",
        logo: "/logos/production.svg",
        status: "Planned",
      },
    ],
  },
];

export default roadmapData;