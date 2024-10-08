"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CVData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
}

const defaultCVData: CVData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "(123) 456-7890",
  summary: "Experienced professional with a passion for...",
  experience: "Company A - Position\nCompany B - Position",
  education: "University X - Degree\nUniversity Y - Degree",
  skills: "Skill 1, Skill 2, Skill 3",
};

export default function CVBuilder() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [design, setDesign] = useState("classic");

  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      setCVData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCVData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDesignChange = (value: string) => {
    setDesign(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: image upload logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CV Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
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
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={cvData.summary}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={cvData.experience}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                name="education"
                value={cvData.education}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={cvData.skills}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold my-4">Design Options</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="design">CV Design</Label>
              <Select onValueChange={handleDesignChange} defaultValue={design}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a design" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">CV Preview</h2>
          <div className="border p-4 rounded-lg">
            {/* Add CV preview component here */}
            <h3 className="text-xl font-bold">{cvData.name}</h3>
            <p>
              {cvData.email} | {cvData.phone}
            </p>
            <h4 className="font-semibold mt-4">Summary</h4>
            <p>{cvData.summary}</p>
            <h4 className="font-semibold mt-4">Experience</h4>
            <p>{cvData.experience}</p>
            <h4 className="font-semibold mt-4">Education</h4>
            <p>{cvData.education}</p>
            <h4 className="font-semibold mt-4">Skills</h4>
            <p>{cvData.skills}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
