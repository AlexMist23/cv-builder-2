import React from "react";
import { CVData } from "@/types/cv";
import PersonalInfo from "@/components/cv/form/personal-info";
import WorkExperience from "@/components/cv/form/work-experience";
import Education from "@/components/cv/form/education";
import Skills from "@/components/cv/form/skills";
import Projects from "@/components/cv/form/projects";
import Courses from "@/components/cv/form/courses";
import Languages from "@/components/cv/form/languages";
import DesignOptions from "@/components/cv/form/design-options";

interface CVFormProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  design: string;
  setDesign: (value: string) => void;
  skillType: string;
  setSkillType: (value: string) => void;
}

const CVForm: React.FC<CVFormProps> = ({
  cvData,
  setCVData,
  design,
  setDesign,
  skillType,
  setSkillType,
}) => {
  return (
    <div className="space-y-6">
      <PersonalInfo cvData={cvData} setCVData={setCVData} />
      <WorkExperience cvData={cvData} setCVData={setCVData} />
      <Education cvData={cvData} setCVData={setCVData} />
      <Skills
        cvData={cvData}
        setCVData={setCVData}
        skillType={skillType}
        setSkillType={setSkillType}
      />
      <Projects cvData={cvData} setCVData={setCVData} />
      <Courses cvData={cvData} setCVData={setCVData} />
      <Languages cvData={cvData} setCVData={setCVData} />
      <DesignOptions
        design={design}
        setDesign={setDesign}
        cvData={cvData}
        setCVData={setCVData}
      />
    </div>
  );
};

export default CVForm;
