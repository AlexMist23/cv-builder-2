import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { CVData, SkillCategory } from "@/types/cv";

interface SkillsProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  skillType: string;
  setSkillType: (value: string) => void;
}

const Skills: React.FC<SkillsProps> = ({
  cvData,
  setCVData,
  skillType,
  setSkillType,
}) => {
  const handleSkillTypeChange = (value: string) => {
    setSkillType(value);
    setCVData((prevData) => ({
      ...prevData,
      skills:
        value === "basic"
          ? []
          : {
              programmingLanguages: [],
              backEndTech: [],
              frontEndTech: [],
              versionControl: [],
              developmentTools: [],
              databases: [],
            },
    }));
  };

  const addSkill = (category: string, value: string) => {
    setCVData((prevData) => {
      if (Array.isArray(prevData.skills)) {
        return { ...prevData, skills: [...prevData.skills, value] };
      } else {
        return {
          ...prevData,
          skills: {
            ...prevData.skills,
            [category as SkillCategory]: [
              ...(prevData.skills[category as SkillCategory] || []),
              value,
            ],
          },
        };
      }
    });
  };

  const deleteSkill = (category: string, skillToDelete: string) => {
    setCVData((prevData) => {
      if (Array.isArray(prevData.skills)) {
        return {
          ...prevData,
          skills: prevData.skills.filter((skill) => skill !== skillToDelete),
        };
      } else {
        return {
          ...prevData,
          skills: {
            ...prevData.skills,
            [category as SkillCategory]: prevData.skills[
              category as SkillCategory
            ].filter((skill) => skill !== skillToDelete),
          },
        };
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <RadioGroup value={skillType} onValueChange={handleSkillTypeChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="basic" id="basic" />
          <Label htmlFor="basic">Basic Skills</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="developer" id="developer" />
          <Label htmlFor="developer">Developer Skills</Label>
        </div>
      </RadioGroup>
      {skillType === "basic" ? (
        <div>
          <Input
            placeholder="Add a skill"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addSkill("basic", e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.isArray(cvData.skills) &&
              cvData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center"
                >
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-4 w-4"
                    onClick={() => deleteSkill("basic", skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(cvData.skills as Record<SkillCategory, string[]>).map(
            ([category, skills]) => (
              <div key={category}>
                <Label>{category}</Label>
                <Input
                  placeholder={`Add ${category}`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkill(category, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center"
                    >
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-4 w-4"
                        onClick={() => deleteSkill(category, skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;
