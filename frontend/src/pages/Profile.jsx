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
    <div className="min-h-screen overflow-x-hidden bg-[#09090B]">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl

          px-4
          py-6

          sm:px-6
          sm:py-8

          lg:px-8
        "
      >
        {/* Header */}

        <ProfileHeader />

        {/* Content */}

        <div
          className="
            mt-6
            space-y-6

            sm:mt-8
            sm:space-y-8
          "
        >
          <AboutSection />

          <EngineeringRoadmap />

          <ExperienceTimeline />

          <TechStack />

          <Certifications />

          <ProjectsTimeline />

          <ResumeCard />

          <ContactCard />
        </div>
      </div>
    </div>
  );
}