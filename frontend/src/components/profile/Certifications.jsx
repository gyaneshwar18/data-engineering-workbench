import { Award } from "lucide-react";

const achievements = [
  "Data Engineering with Python – dltHub(codefreecamp)",
  "Data Engineering on Databricks – Databricks Academy",
  "Azure Data Factory & Databricks – Simplilearn SkillUp",
  "Completed LeetCode SQL 50 Study Plan and earned the completion badge.",
  "Contributed to open-source projects on GitHub and earned achievement badges.",
];

export default function Certifications() {
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
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-amber-500/20
            bg-amber-500/10
          "
        >
          <Award size={20} className="text-amber-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-white">
            CERTIFICATIONS &amp; ACHIEVEMENTS
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Professional certifications and continuous learning
          </p>
        </div>
      </div>

      <ul className="mt-8 space-y-4 text-sm leading-6 text-slate-300">
        {achievements.map((achievement) => (
          <li key={achievement} className="flex items-start gap-3">
            <span className="mt-0.5 text-amber-400" aria-hidden="true">
              •
            </span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
