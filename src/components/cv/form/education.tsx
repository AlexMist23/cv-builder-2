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
import { CVData, Education as EducationType } from "@/types/cv";

interface EducationProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const Education: React.FC<EducationProps> = ({ cvData, setCVData }) => {
  const addEducation = () => {
    setCVData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          id: Date.now().toString(),
          degree: "",
          institution: "",
          startDate: null,
          endDate: null,
          description: "",
        },
      ],
    }));
  };

  const updateEducation = (
    id: string,
    field: keyof EducationType,
    value: string | Date | null
  ) => {
    setCVData((prevData) => ({
      ...prevData,
      education: prevData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const deleteEducation = (id: string) => {
    setCVData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((edu) => edu.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Education</h2>
      {cvData.education.map((edu) => (
        <div
          key={edu.id}
          className="space-y-2 border border-border p-4 rounded-md relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => deleteEducation(edu.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
          />
          <Input
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) =>
              updateEducation(edu.id, "institution", e.target.value)
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {edu.startDate ? (
                    format(edu.startDate, "PPP")
                  ) : (
                    <span>Start Date</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={edu.startDate}
                  onSelect={(date) =>
                    updateEducation(edu.id, "startDate", date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {edu.endDate ? (
                    format(edu.endDate, "PPP")
                  ) : (
                    <span>End Date</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={edu.endDate}
                  onSelect={(date) => updateEducation(edu.id, "endDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Textarea
            placeholder="Description"
            value={edu.description}
            onChange={(e) =>
              updateEducation(edu.id, "description", e.target.value)
            }
          />
        </div>
      ))}
      <Button onClick={addEducation}>Add Education</Button>
    </div>
  );
};

export default Education;
