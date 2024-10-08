import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { CVData, WorkExperience as WorkExperienceType } from "@/types/cv";

interface WorkExperienceProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  cvData,
  setCVData,
}) => {
  const addWorkExperience = () => {
    setCVData((prevData) => ({
      ...prevData,
      workExperience: [
        ...prevData.workExperience,
        {
          id: Date.now().toString(),
          role: "",
          company: "",
          startDate: null,
          endDate: null,
          description: "",
        },
      ],
    }));
  };

  const updateWorkExperience = (
    id: string,
    field: keyof WorkExperienceType,
    value: string | Date | null
  ) => {
    setCVData((prevData) => ({
      ...prevData,
      workExperience: prevData.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const deleteWorkExperience = (id: string) => {
    setCVData((prevData) => ({
      ...prevData,
      workExperience: prevData.workExperience.filter((exp) => exp.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Work Experience</h2>
      {cvData.workExperience.map((exp) => (
        <div
          key={exp.id}
          className="space-y-2 border border-border p-4 rounded-md relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => deleteWorkExperience(exp.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Role"
            value={exp.role}
            onChange={(e) =>
              updateWorkExperience(exp.id, "role", e.target.value)
            }
          />
          <Input
            placeholder="Company"
            value={exp.company}
            onChange={(e) =>
              updateWorkExperience(exp.id, "company", e.target.value)
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {exp.startDate ? (
                    format(exp.startDate, "PPP")
                  ) : (
                    <span>Start Date</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={exp.startDate}
                  onSelect={(date) =>
                    updateWorkExperience(exp.id, "startDate", date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {exp.endDate ? (
                    format(exp.endDate, "PPP")
                  ) : (
                    <span>End Date</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={exp.endDate}
                  onSelect={(date) =>
                    updateWorkExperience(exp.id, "endDate", date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) =>
              updateWorkExperience(exp.id, "description", e.target.value)
            }
          />
        </div>
      ))}
      <Button onClick={addWorkExperience}>Add Work Experience</Button>
    </div>
  );
};

export default WorkExperience;
