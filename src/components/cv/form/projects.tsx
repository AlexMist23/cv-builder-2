import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { CVData, Project } from "@/types/cv";

interface ProjectsProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const Projects: React.FC<ProjectsProps> = ({ cvData, setCVData }) => {
  const addProject = () => {
    setCVData((prevData) => ({
      ...prevData,
      projects: [
        ...prevData.projects,
        {
          id: Date.now().toString(),
          title: "",
          techStack: [],
          demo: "",
          repository: "",
          description: "",
        },
      ],
    }));
  };

  const updateProject = (
    id: string,
    field: keyof Project,
    value: string | string[]
  ) => {
    setCVData((prevData) => ({
      ...prevData,
      projects: prevData.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setCVData((prevData) => ({
      ...prevData,
      projects: prevData.projects.filter((project) => project.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Projects</h2>
      {cvData.projects.map((project) => (
        <div
          key={project.id}
          className="space-y-2 border border-border p-4 rounded-md relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => deleteProject(project.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => updateProject(project.id, "title", e.target.value)}
          />
          <Input
            placeholder="Tech Stack (comma-separated)"
            value={project.techStack.join(", ")}
            onChange={(e) =>
              updateProject(
                project.id,
                "techStack",
                e.target.value.split(",").map((item) => item.trim())
              )
            }
          />
          <Input
            placeholder="Demo Link"
            value={project.demo}
            onChange={(e) => updateProject(project.id, "demo", e.target.value)}
          />
          <Input
            placeholder="Repository Link"
            value={project.repository}
            onChange={(e) =>
              updateProject(project.id, "repository", e.target.value)
            }
          />
          <Textarea
            placeholder="Description"
            value={project.description}
            onChange={(e) =>
              updateProject(project.id, "description", e.target.value)
            }
          />
        </div>
      ))}
      <Button onClick={addProject}>Add Project</Button>
    </div>
  );
};

export default Projects;
