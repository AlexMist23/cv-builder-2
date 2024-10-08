"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import CVPreview from "@/components/cv-preview";
import CVForm from "@/components/cv/form/cv-form";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CVData, CVSection } from "@/types/cv";

const defaultCVData: CVData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  summary:
    "Experienced software developer with a passion for creating efficient and scalable applications.",
  workExperience: [
    {
      id: "1",
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      startDate: new Date("2018-01-01"),
      endDate: null,
      description:
        "Lead development of cloud-based applications using React and Node.js.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      startDate: new Date("2010-09-01"),
      endDate: new Date("2014-06-30"),
      description: "Focused on software engineering and data structures.",
    },
  ],
  skills: {
    programmingLanguages: ["JavaScript", "TypeScript", "Python"],
    backEndTech: ["Node.js", "Express", "Django"],
    frontEndTech: ["React", "Vue.js", "HTML/CSS"],
    versionControl: ["Git", "GitHub"],
    developmentTools: ["VS Code", "Docker"],
    databases: ["MongoDB", "PostgreSQL"],
  },
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      techStack: ["React", "Node.js", "MongoDB"],
      demo: "https://example-ecommerce.com",
      repository: "https://github.com/johndoe/ecommerce-platform",
      description:
        "Developed a full-stack e-commerce platform with user authentication and payment integration.",
    },
  ],
  courses: [
    {
      id: "1",
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      date: new Date("2022-03-15"),
      description:
        "In-depth course on advanced React patterns and best practices.",
    },
  ],
  languages: [
    {
      id: "1",
      name: "English",
      proficiency: "C2",
    },
    {
      id: "2",
      name: "Spanish",
      proficiency: "B2",
    },
  ],
  image: null,
  personalWebsite: "https://johndoe.dev",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
};

const defaultSections: CVSection[] = [
  "personalInfo",
  "summary",
  "workExperience",
  "education",
  "skills",
  "projects",
  "courses",
  "languages",
];

export default function CVBuilder() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [design, setDesign] = useState("classic");
  const [skillType, setSkillType] = useState("developer");
  const [sections, setSections] = useState<CVSection[]>(defaultSections);

  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    const savedSections = localStorage.getItem("cvSections");
    const savedDesign = localStorage.getItem("cvDesign");
    const savedSkillType = localStorage.getItem("cvSkillType");

    if (savedData) {
      setCVData(JSON.parse(savedData));
    }
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
    if (savedDesign) {
      setDesign(savedDesign);
    }
    if (savedSkillType) {
      setSkillType(savedSkillType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem("cvSections", JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem("cvDesign", design);
  }, [design]);

  useEffect(() => {
    localStorage.setItem("cvSkillType", skillType);
  }, [skillType]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("cv-preview");
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv.pdf");
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newSections = Array.from(sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    setSections(newSections);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CV Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">CV Sections</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section}
                      draggableId={section}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-secondary text-secondary-foreground p-2 rounded cursor-move"
                        >
                          {section}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <CVForm
            cvData={cvData}
            setCVData={setCVData}
            design={design}
            setDesign={setDesign}
            skillType={skillType}
            setSkillType={setSkillType}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">CV Preview</h2>
          <div className="mb-4">
            <Button onClick={handleDownloadPDF}>Download PDF</Button>
          </div>
          <div
            id="cv-preview"
            className="border rounded-lg overflow-hidden"
            style={{ width: "210mm", height: "297mm" }}
          >
            <CVPreview cvData={cvData} design={design} sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
}
