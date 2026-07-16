import ProfileHeader from "../components/profile/ProfileHeader";
import AboutSection from "../components/profile/AboutSection";
import ExperienceTimeline from "../components/profile/ExperienceTimeline";
import TechStack from "../components/profile/TechStack";
import Certifications from "../components/profile/Certifications";
import EngineeringRoadmap from "../components/profile/EngineeringRoadmap";
import ProjectsTimeline from "../components/profile/ProjectsTimeline";
import ResumeCard from "../components/profile/ResumeCard";
import ContactCard from "../components/profile/ContactCard";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#09090B]">

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}

        <ProfileHeader />

        {/* Content */}

        <div className="mt-8 space-y-8">

          <AboutSection />

          <ExperienceTimeline />

          <TechStack />

          <Certifications />

          <EngineeringRoadmap />

          <ProjectsTimeline />

          <ResumeCard />

          <ContactCard />

        </div>

      </div>

    </div>
  );
}