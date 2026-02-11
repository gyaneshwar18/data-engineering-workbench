import ProjectCard from "../components/ProjectCard";

export default function Projects() {

  const projects = [
    {
      title: "API → ETL → SQL Analytics Pipeline",
      problem: "Built automated ingestion and SQL analytics pipeline",
      tech: ["Python", "PostgreSQL", "ETL"],
      impact: "Processed 1M+ rows"
    },
    {
      title: "SQL Optimization Lab",
      problem: "Advanced joins + window function optimization",
      tech: ["SQL", "Performance"],
      impact: "40% query speed gain"
    },
    {
      title: "Data Dashboard Platform",
      problem: "Analytics UI with live metrics",
      tech: ["React", "Charts"],
      impact: "Recruiter portfolio platform"
    }
  ];

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Projects — Case Studies
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {projects.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}

      </div>

    </div>
  );
}
