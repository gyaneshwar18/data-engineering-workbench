import ProjectCard from "../components/ProjectCard";

export default function Projects() {

  const projects = [
    {
      title: "API → ETL → SQL Analytics Pipeline",
      problem: "Automated ingestion, transformation, and analytics pipeline for multi-source datasets",
      tech: ["Python", "PostgreSQL", "ETL", "API"],
      impact: "Processed 1M+ rows daily",
      status: "Production"
    },
    {
      title: "SQL Optimization Lab",
      problem: "Advanced joins and window function optimization experiments",
      tech: ["SQL", "Indexes", "Performance"],
      impact: "40% query speed improvement",
      status: "Research"
    },
    {
      title: "Analytics Dashboard Platform",
      problem: "Interactive portfolio dashboard with live metrics",
      tech: ["React", "Charts", "UI"],
      impact: "Recruiter-focused analytics UI",
      status: "Live"
    }
  ];

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
          Projects — Case Studies
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Real data engineering & analytics implementations
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">

        {projects.map(p => (
          <ProjectCard key={p.title} {...p} />
        ))}

      </div>

    </div>
  );
}
