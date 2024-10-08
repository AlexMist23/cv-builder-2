import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CVData } from "@/types/cv";

interface PersonalInfoProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ cvData, setCVData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCVData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={cvData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={cvData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={cvData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="personalWebsite">Personal Website</Label>
          <Input
            id="personalWebsite"
            name="personalWebsite"
            value={cvData.personalWebsite}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={cvData.linkedin}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            name="github"
            value={cvData.github}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={cvData.summary}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
