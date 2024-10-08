import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { CVData, Language } from "@/types/cv";

interface LanguagesProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const Languages: React.FC<LanguagesProps> = ({ cvData, setCVData }) => {
  const addLanguage = () => {
    setCVData((prevData) => ({
      ...prevData,
      languages: [
        ...prevData.languages,
        { id: Date.now().toString(), name: "", proficiency: "A1" },
      ],
    }));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setCVData((prevData) => ({
      ...prevData,
      languages: prevData.languages.map((language) =>
        language.id === id ? { ...language, [field]: value } : language
      ),
    }));
  };

  const deleteLanguage = (id: string) => {
    setCVData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter((language) => language.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Languages</h2>
      {cvData.languages.map((language) => (
        <div
          key={language.id}
          className="space-y-2 border border-border p-4 rounded-md relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => deleteLanguage(language.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Language"
            value={language.name}
            onChange={(e) =>
              updateLanguage(language.id, "name", e.target.value)
            }
          />
          <Select
            value={language.proficiency}
            onValueChange={(value) =>
              updateLanguage(language.id, "proficiency", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select proficiency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A1">A1 - Beginner</SelectItem>
              <SelectItem value="A2">A2 - Elementary</SelectItem>
              <SelectItem value="B1">B1 - Intermediate</SelectItem>
              <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
              <SelectItem value="C1">C1 - Advanced</SelectItem>
              <SelectItem value="C2">C2 - Proficient</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={addLanguage}>Add Language</Button>
    </div>
  );
};

export default Languages;
