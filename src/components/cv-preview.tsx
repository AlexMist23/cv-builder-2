import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { CVData, CVSection } from "@/types/cv";

interface CVPreviewProps {
  cvData: CVData;
  design: string;
  sections: CVSection[];
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData, design, sections }) => {
  const getDesignClasses = () => {
    switch (design) {
      case "modern":
        return "bg-secondary text-secondary-foreground font-sans";
      case "creative":
        return "bg-primary/10 text-primary-foreground font-serif";
      default:
        return "bg-background text-foreground font-serif";
    }
  };

  const renderSection = (section: CVSection) => {
    switch (section) {
      case "personalInfo":
        return (
          <div className="flex items-center mb-6">
            {cvData.image ? (
              <Image
                src={cvData.image}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full mr-4"
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-muted rounded-full mr-4 flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{cvData.name}</h1>
              <p className="text-lg">
                {cvData.email} | {cvData.phone}
              </p>
              {cvData.personalWebsite && <p>{cvData.personalWebsite}</p>}
              {cvData.linkedin && <p>LinkedIn: {cvData.linkedin}</p>}
              {cvData.github && <p>GitHub: {cvData.github}</p>}
            </div>
          </div>
        );
      case "summary":
        return (
          cvData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Professional Summary
              </h2>
              <p>{cvData.summary}</p>
            </div>
          )
        );
      case "workExperience":
        return (
          cvData.workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
              {cvData.workExperience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <h3 className="font-semibold">
                    {exp.role} at {exp.company}
                  </h3>
                  <p>
                    {exp.startDate &&
                      format(new Date(exp.startDate), "MMM yyyy")}{" "}
                    -{" "}
                    {exp.endDate
                      ? format(new Date(exp.endDate), "MMM yyyy")
                      : "Present"}
                  </p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )
        );
      case "education":
        return (
          cvData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {cvData.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-semibold">
                    {edu.degree} - {edu.institution}
                  </h3>
                  <p>
                    {edu.startDate &&
                      format(new Date(edu.startDate), "MMM yyyy")}{" "}
                    -{" "}
                    {edu.endDate
                      ? format(new Date(edu.endDate), "MMM yyyy")
                      : "Present"}
                  </p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          )
        );
      case "skills":
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            {Array.isArray(cvData.skills) ? (
              <p>{cvData.skills.join(", ")}</p>
            ) : (
              <div>
                {Object.entries(cvData.skills).map(([category, skills]) => (
                  <div key={category} className="mb-2">
                    <h3 className="font-semibold">{category}</h3>
                    <p>{(skills as string[]).join(", ")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "projects":
        return (
          cvData.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              {cvData.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p>Tech Stack: {project.techStack.join(", ")}</p>
                  {project.demo && <p>Demo: {project.demo}</p>}
                  {project.repository && (
                    <p>Repository: {project.repository}</p>
                  )}
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          )
        );
      case "courses":
        return (
          cvData.courses.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Courses</h2>
              {cvData.courses.map((course) => (
                <div key={course.id} className="mb-4">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p>Provider: {course.provider}</p>
                  {course.date && (
                    <p>Date: {format(new Date(course.date), "MMM yyyy")}</p>
                  )}
                  <p>{course.description}</p>
                </div>
              ))}
            </div>
          )
        );
      case "languages":
        return (
          cvData.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Languages</h2>
              {cvData.languages.map((language) => (
                <div key={language.id} className="mb-2">
                  <span className="font-semibold">{language.name}: </span>
                  <span>{language.proficiency}</span>
                </div>
              ))}
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full h-full p-8 ${getDesignClasses()}`}>
      {sections.map((section) => (
        <React.Fragment key={section}>{renderSection(section)}</React.Fragment>
      ))}
    </div>
  );
};

export default CVPreview;
